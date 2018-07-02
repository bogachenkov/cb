const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const path = require('path');

// multer config
const multer = require('multer');
const storage = multer.memoryStorage();
let upload = multer({ storage });

// cloudinary config
const cloudinaryConfig = require('../../config/cloudinary')
cloudinary.config(cloudinaryConfig);

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePotsInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req,res) => res.json({msg: 'Posts works!'}))

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .populate('profile', ['username', 'name', 'surname', 'avatar'])
    .sort('-publish_date')
    .then((posts) => {
      if (!posts) return res.json({posts: 'Тут пока нет ни одной записи'});
      return res.json(posts);
    })
    .catch(err => res.status(404).json({err}))
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .populate('profile', ['username', 'name', 'surname', 'avatar'])
    .populate('comments.profile', ['name', 'surname', 'avatar', 'username'])
    .then((post) => {
      if (!post) {
        errors.nopost = 'Запись не найдена';
        return res.status(404).json(errors);
      }
      return res.json(post);
    })
    .catch(err => {
      errors.nopost = 'Запись не найдена';
      return res.status(404).json(errors);
    })
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {

  const { errors, isValid } = validatePotsInput(req.body, req.file);
  if (!isValid) return res.status(400).json(errors);

  Profile.findById(req.user.id)
    .then(profile => {
      const newPost = new Post({
        profile: req.user.id,
        title: req.body.title,
        content: req.body.content,
      });

      if (req.body.tags) {
        newPost.tags = req.body.tags.split(',').map((tag) => tag.trim())
      }

      if (req.file) {
        cloudinary.v2.uploader.upload_stream({ folder: 'posts', quality: 'auto:good' }, (err, result) => {
          if (err) return res.status(500).json(err);
          console.log(result);

          newPost.image = `${result.public_id}.${result.format}`;
          newPost.save()
          .then((post) => {
            Post.find()
              .populate('profile', ['name', 'surname', 'avatar', 'username'])
              .sort('-publish_date')
              .then((posts) => {
                if (!posts) return res.json({posts: 'Тут пока нет ни одной записи'});
                return res.json(posts);
              })
              .catch(err => res.status(404).json({err}))
          }).catch((err) => res.status(400).json(err));
        }).end(req.file.buffer);
      } else {
        newPost.save()
          .then((post) => {
            Post.find()
              .populate('profile', ['name', 'surname', 'avatar', 'username'])
              .sort('-publish_date')
              .then((posts) => {
                if (!posts) return res.json({posts: 'Тут пока нет ни одной записи'});
                return res.json(posts);
              })
              .catch(err => res.status(404).json({err}))
          })
          .catch((err) => res.status(400).json(err));
      }
    })
    .catch((err) => res.json(err))
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};

  console.log(req.params.id);

  Profile.findById(req.user.id)
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (!post) {
            errors.nopost = 'Запись не найдена.';
            return res.status(404).json(errors);
          }
          if (post.profile.toString() !== req.user.id) {
            return res.status(401).json({notowner: 'Вы не авторизованы или данная запись не принадлежит Вам'});
          }
          const image = post.image;
          console.log('Image: ', image);
          if (image) {
            console.log('inside if block');
            const imagePublicId = 'posts/' + path.basename(image, path.extname(image));
            console.log('p_id: ', imagePublicId);
            cloudinary.v2.uploader.destroy(imagePublicId, {invalidate: true}, (err, result) => {
              console.log('Image has been deleted');
            })
          }
          post.remove().then(() => res.json({success: true}))
        })
        .catch((err) => res.json(err));
    });
});

// @route  POST api/posts/user/:id
// @desc   Add comment to post
// @access Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body );

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        profile: req.user.id
      }

      // Add to comments array
      post.comments.unshift(newComment);
      post.save()
        .then(() => {
          Post.findById(req.params.id)
          .populate('profile', ['name', 'surname', 'avatar'])
          .populate('comments.profile', ['name', 'surname', 'avatar'])
          .then((post) => res.json(post))
        })
        .catch(err => res.json(err));
    }).catch(err => res.status(404).json({ postnotfound: 'Запись не найдена' }));
});

// @route  DELETE api/posts/comment/:id/:com_id
// @desc   Delete a comment
// @access Private
router.delete('/comment/:id/:com_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .then(post => {
      // Check if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.com_id).length === 0) {
        errors.commentnotfound = 'Комментарий не найден';
        return res.json(errors);
      }

      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.com_id);
      post.comments.splice(removeIndex, 1);
      post.save()
        .then(post => {
          Post.findById(req.params.id)
          .populate('profile', ['name', 'surname', 'avatar'])
          .populate('comments.profile', ['name', 'surname', 'avatar'])
          .then((post) => res.json(post))
        })
        .catch(err => res.json(err));
    }).catch(err => {
      errors.postnotfound = 'Запись не найдена';
      return res.status(404).json(errors);
    });
})

module.exports = router;
