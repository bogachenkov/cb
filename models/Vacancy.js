const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VacancySchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  employment: {
    type: String,
  },
  jobType: {
    type: String,
  },
  skills: [
    {
      type: String,
      required: true
    }
  ],
  applies: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
      },
      isWatched: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vacancy = mongoose.model('Vacancy', VacancySchema);
