const express = require('express');
const router = express.Router();
const passport = require('passport');

const Vacancy = require('../../models/Vacancy');
const Profile = require('../../models/Profile');

const validateVacancyData = require('../../validation/vacancy');

// @route   GET api/vacancies
// @desc    Get all vacancies
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Vacancy.find()
    .populate('profile', ['username', 'avatar'])
    .sort('-date')
    .then((vacancies) => {
      if (!vacancies) return res.status(404).json({novacancies: 'Вакансий не найдено'});
      return res.json(vacancies);
    })
    .catch(err => res.status(404).json({err}))
});

// @route   POST api/vacancies
// @desc    Create new vacancy
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateVacancyData(req.body);
  if (!isValid) return res.status(400).json(errors);

  const newVacancy = new Vacancy({
    profile: req.user.id,
    title: req.body.title,
    description: req.body.description,
    salary: req.body.salary,
    company: req.body.company,
    location: req.body.location,
    employment: req.body.employment,
    jobType: req.body.jobType,
    skills: req.body.skills.split(',').map(skill => skill.trim())
  })

  newVacancy.save()
    .then(vacancy => res.json({v_id: vacancy._id}))
    .catch((err) => res.json(err));
});

// @route   GET api/vacancies/my
// @desc    Get current profile vacancies
// @access  Private
router.get('/my', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};

  Vacancy.find({profile: req.user.id})
    .populate('profile', ['username', 'avatar'])
    .sort('-date')
    .then((vacancy) => {
      if (!vacancy) {
        errors.novacancies = 'Вакансии не найдены';
        return res.status(404).json(errors);
      }
      return res.json(vacancy);
    })
    .catch(err => res.json(err));
});

// @route   GET api/vacancies/responses
// @desc    Get current profile responses
// @access  Private
router.get('/responses', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};

  Vacancy.find()
    .where('applies.profile').equals(req.user.id)
      .populate('profile', ['avatar', 'username'])
    .then((vacancy) => {
      if (!vacancy) {
        errors.novacancy = 'Вакансия не найдена';
        return res.status(404).json(errors);
      }
      return res.json(vacancy);
    })
    .catch(err => res.json(err));
});

// @route   POST api/vacancies/responses
// @desc    Response the vacancy
// @access  Private
router.post('/responses', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};

  Vacancy.findById(req.body.id)
    .populate('profile', ['username', 'name', 'surname'])
    .populate('applies.profile', ['username', 'name', 'surname', 'avatar'])
    .then((vacancy) => {
      if (!vacancy) {
        errors.novacancy = 'Вакансия не найдена';
        return res.status(404).json(errors);
      }
      vacancy.applies.unshift({
        profile: req.user.id
      });
      vacancy.save()
        .then(vacancy => res.json(vacancy))
        .catch(err => res.json(err))

    })
    .catch(err => res.json(err));
});

// @route   POST api/vacancies/apply
// @desc    Set the apply's isViewed as true
// @access  Private
router.post('/apply/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};

  Vacancy.findById(req.params.id)
    .populate('profile', ['username', 'name', 'surname'])
    .populate('applies.profile', ['username', 'name', 'surname', 'avatar', 'skills'])
    .then((vacancy) => {
      if (!vacancy) {
        errors.novacancy = 'Вакансия не найдена';
        return res.status(404).json(errors);
      }
      const indexOfApply = vacancy.applies.findIndex(el => {
        return el._id == req.body.apply_id;
      });
      console.log(indexOfApply);
      if (indexOfApply < 0) return res.status(404).json({noApply: 'Отклик не найден!'});
      vacancy.applies[indexOfApply].isWatched = true;
      vacancy.save()
        .then(vacancy => res.json(vacancy))
        .catch(err => res.json(err))

    })
    .catch(err => res.json(err));
});

// @route   DELETE api/vacancies
// @desc    Delete vacancy by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {}

  Vacancy.findById(req.params.id)
    .then(vacancy => {
      if (!vacancy) {
        errors.novacancy = 'Вакансия не найдена';
        return res.status(404).json(errors);
      }
      if (vacancy.profile != req.user.id) {
        errors.notowner = 'Нельзя удалить чужую вакансию';
        return res.status(401).json(errors);
      }
      vacancy.remove()
        .then(() => res.json('Вакансия успешно удалена'))
        .catch(err => res.json(err))
    });
});

// @route   GET api/vacancies/:id
// @desc    Get vacancy by id
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};

  console.log('Get by ID: ', req.params.id);

  Vacancy.findById(req.params.id)
    .populate('profile', ['username', 'name', 'surname'])
    .populate('applies.profile', ['username', 'name', 'surname', 'avatar', 'skills', 'specialty'])
    .then((vacancy) => {
      console.log(!!vacancy);
      if (!vacancy) {
        errors.novacancy = 'Вакансия не найдена';
        return res.status(404).json(errors);
      }
      return res.json(vacancy);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
