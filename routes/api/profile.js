const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const cloudinary = require('cloudinary');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const storage = multer.memoryStorage();
let upload = multer(
  { storage },
  fileFilter = (req, file, cb) => {
    if (file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='jpg') {
      console.log('It is an image, OK');
      cb(null, true);
    } else {
      console.log('It is not an image, REJECT');
      cb(null, false);
    }
  }
);

const secretOrKey = require('../../config/keys').secretOrKey;

const Profile = require('../../models/Profile');

const profileValidation = require('../../validation/profile');
const experienceValidation = require('../../validation/experience');
const educationValidation = require('../../validation/education');
const socialValidation = require('../../validation/social');
const contactsValidation = require('../../validation/contacts');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateImage = require('../../validation/image');

// cloudinary config
const cloudinaryConfig = require('../../config/cloudinary')
cloudinary.config(cloudinaryConfig);

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req,res) => res.json({msg: 'Profile works!'}))

// @route   POST api/profile/register
// @desc    Register route
// @access  Public
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ email: req.body.email })
    .then(profile => {
      if (profile) {
        errors.email = 'Пользователь с таким email-адресом уже зарегистрирован.';
        return res.status(400).json(errors)
      } else {
        Profile.findOne({ username: req.body.username })
          .then((profile) => {
            if (profile) {
              errors.username = 'Данный ник уже используется.';
              res.status(400).json(errors);
            } else {
              const newProfile = new Profile({
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                specialty: req.body.specialty,
                searchingStatus: req.body.searchingStatus
              });

              if (typeof req.body.skills !== 'undefined') {
                newProfile.skills = req.body.skills.split(',').map(skill => skill.trim());
              }

              password: bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newProfile.password, salt, (err, hash) => {
                  if (err) throw err;
                  newProfile.password = hash;
                  newProfile.save()
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err));
                });
              });
            }
          })
          .catch((err) => res.json(err));
      }
    })
});

// @route   POST api/profile/login
// @desc    Login profile / Returning JWT
// @access  Public
router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find Profile
  Profile.findOne({email})
    .then(profile => {
      if (!profile) {
        errors.email = 'Пользователь с таким email не найден';
        return res.status(404).json(errors);
      }

      // Pass check
      bcryptjs.compare(password, profile.password)
        .then(isMatch => {
          if (isMatch) {
            // JWT
            // id: profile.id,
            // name: profile.name,
            // surname: profile.surname,
            // avatar: profile.avatar
            jwt.sign({...profile.toObject(), id: profile._id},
            secretOrKey,
            {expiresIn: "1d"},
            (err, token) => {
              if(err) return res.status(400).json('Ошибка при генерации токена');
              res.json({
                success: true,
                token: 'Bearer ' + token,
                profile
              })
            });
          } else {
            errors.password = 'Неверный пароль';
            return res.status(400).json(errors);
          }
        })
    });
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}) ,(req, res) => {

  const errors = {};

  Profile.findById(req.user.id)
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'Профиль не найден!';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/username/:username
// @desc    Get profile by username
// @access  Public
router.get('/username/:username', (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.params.username })
  .then(profile => {
    if (!profile) {
      errors.noprofile = 'Профиль не найден';
      return res.status(404).json(errors);
    }
    return res.json(profile);
  })
  .catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .then((profiles) => {
      if (!profiles) {
        errors.noprofiles = 'Ни одного профиля не найдено';
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch((err) => {
      errors.noprofiles = 'Ни одного профиля не найдено';
      return res.status(404).json(errors);
    });
})

// @route   POST api/profile
// @desc    Edit profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = profileValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  const profileFields = {};
  if (req.body.handle) profileFields.handle = req.body.handle;
  profileFields.company = req.body.company ? req.body.company : '';
  profileFields.website = req.body.website ? req.body.website : '';
  profileFields.location = req.body.location ? req.body.location : '';
  profileFields.specialty = req.body.specialty ? req.body.specialty : null;
  profileFields.searchingStatus = req.body.searchingStatus ? req.body.searchingStatus : '';
  profileFields.about = req.body.about ? req.body.about : '';
  profileFields.github = req.body.github ? req.body.github : '';

  // Split skills string into an array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',').map(skill => skill.trim());
  }

  Profile.findById(req.user.id)
    .then((profile) => {
      if (profile) {
        Profile.findByIdAndUpdate(
          req.user.id,
          { $set: profileFields },
          { new: true }
        )
        .then((profile) => res.json(profile))
        .catch(err => res.status(400).json({err}));
      }
    })
    .catch((err) => res.status(400).json(err));
});

// @route   POST api/profile/experience
// @desc    Add experience info to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = experienceValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Сначала создайте профиль!';
        return res.status(404).json(errors);
      }

      const nexExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      profile.experience.unshift(nexExp)
      profile.save().then((profile) => res.json(profile));
    })
});

// @route   POST api/profile/photo
// @desc    Add photo to profile
// @access  Private
router.post('/photo', passport.authenticate('jwt', { session: false }),  upload.single('photo'), (req, res) => {

  const {errors, isValid} = validateImage(req.file);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Профиль не найден!';
        return res.status(404).json(errors);
      }

      cloudinary.v2.uploader.upload_stream({ folder: 'avatars', height: 400, width: 400, crop: "fill" }, (err, result) => {
        if (err) return res.json(err);
        if (!(result && result.secure_url)) {
          errors.hostingerror = 'Ошибка на стороне хостинга изображений';
          res.status(500).json(errors);
        }
        console.log(result);
        profile.avatar = `${result.public_id}.${result.format}`;
        profile.save()
          .then((profile) => res.json(profile))
          .catch(err => res.status(500).json(err));
      }).end(req.file.buffer); //end of upload stream
    }) // end post.find.then
    .catch((err) => res.json(err))
});

// @route   POST api/profile/photo
// @desc    Delete photo from profile
// @access  Private
router.post('/photo/delete', passport.authenticate('jwt', { session: false }), (req, res) => {

  //const { errors, isValid } = experienceValidation(req.body);
  //if (!isValid) return res.status(400).json(errors);
  const errors = {};
  const defaultPublicId = 'avatars/avatar-1577909_640.png';

  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Профиль не найден!';
        return res.status(404).json(errors);
      }

      const deletePublicId = 'avatars/' + path.basename(profile.avatar, path.extname(profile.avatar));
      console.log(deletePublicId);

      if (deletePublicId === defaultPublicId) {
        errors.nophoto = 'Нельзя удалить несуществующее фото';
        return res.status(404).json(errors);
      }

      cloudinary.v2.uploader.destroy(deletePublicId, {invalidate: true}, (err, result) => {
        if (err) return res.json(err);

        profile.avatar = defaultPublicId;

        if (result.result === 'not found') {
          errors.nophoto = 'Фото не найдено на сервере';
          console.log('No photo');
          // return res.status(404).json(errors);
        }

        profile.save()
          .then((profile) => res.json(profile))
          .catch(err => res.status(500).json(err));
      })
    })
    .catch((err) => res.json(err))
});

// @route   POST api/profile/contacts
// @desc    Add contact info to profile
// @access  Private
router.post('/contacts', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = contactsValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Сначала создайте профиль!';
        return res.status(404).json(errors);
      }

      const contacts = {
        email: req.body.email,
        phone: req.body.phone,
        telegram: req.body.telegram,
        skype: req.body.skype
      }

      profile.contacts = contacts;
      profile.save().then((profile) => res.json(profile));
    })
});

// @route   POST api/profile/social
// @desc    Add social info to profile
// @access  Private
router.post('/social', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = socialValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Сначала создайте профиль!';
        return res.status(404).json(errors);
      }

      const social = {};

      if (req.body.twitter) social.twitter = req.body.twitter;
      if (req.body.vk) social.vk = req.body.vk;
      if (req.body.facebook) social.facebook = req.body.facebook;
      if (req.body.linkedin) social.linkedin = req.body.linkedin;
      console.log(social);
      profile.social = social;
      profile.save().then((profile) => res.json(profile));
    })
});


// @route   POST api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.post('/favorites/posts/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Профиль не найден';
        return res.status(404).json(errors);
      }
      if (profile.favoritesPosts && profile.favoritesPosts.includes(req.params.post_id)) {
        profile.favoritesPosts.filter((post) => post.id !== req.params.post_id);
      } else {
        profile.favoritesPosts.unshift(req.params.post_id);
      }
      post.save()
        .then((profile) => res.json(profile))
        .catch((err) => res.json(err))
    })
    .catch((err) => {
      errors.noprofile = 'Профиль не найден';
      return res.status(404).json(errors);
    })
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Профиль не найден';
        return res.status(404).json(errors);
      }
      const updatedExp = profile.experience.filter((exp) => exp.id !== req.params.exp_id);
      profile.experience = updatedExp;
      profile.save().then((profile) => {
        return res.json(profile);
      })
      .catch((err) => {
        errors.delete = 'Ошибка в базе данных';
        return res.status(400).json(errors);
      })
    })
    .catch((err) => {
      errors.noprofile = 'Профиль не найден';
      return res.status(404).json(errors);
    })
});

// @route   POST api/profile/education
// @desc    Add education info to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = educationValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Сначала создайте профиль!';
        return res.status(404).json(errors);
      }

      const nexEdu = {
        university: req.body.university,
        faculty: req.body.faculty,
        specialty: req.body.specialty,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        additionally: req.body.additionally
      }

      profile.education.unshift(nexEdu)
      profile.save().then((profile) => res.json(profile));
    })
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findById(req.user.id)
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Профиль не найден';
        return res.status(404).json(errors);
      }
      const updatedEdu = profile.education.filter((edu) => edu.id !== req.params.edu_id);
      profile.education = updatedEdu;
      profile.save().then((profile) => {
        return res.json(profile);
      })
      .catch((err) => {
        errors.delete = 'Ошибка в базе данных';
        return res.status(400).json(errors);
      })
    })
    .catch((err) => {
      errors.noprofile = 'Профиль не найден';
      return res.status(404).json(errors);
    })
});

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
      .then(() => res.json({ success: true }))
    });
});

module.exports = router;
