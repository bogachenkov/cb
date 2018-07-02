const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'avatars/avatar-1577909_640.png'
  },
  username: {
    type: String,
    max: 40,
    required: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  specialty: {
    type: String,
    required: true
  },
  searchingStatus: {
    type: String,
    default: 'Ищу работу'
  },
  skills: {
    type: [String],
    required: true
  },
  about: {
    type: String,
  },
  github: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      university: {
        type: String,
        required: true
      },
      faculty: {
        type: String,
        required: true
      },
      specialty: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      additionally: {
        type: String
      }
    }
  ],
  contacts: {
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    telegram: {
      type: String,
      default: ''
    },
    skype: {
      type: String,
      default: ''
    }
  },
  social: {
    twitter: {
      type: String,
      default: ''
    },
    vk: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
  },
  proposedVacancies: [
    {
      vacancy: {
        type: Schema.Types.ObjectId,
        ref: 'Vacancy'
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
  reg_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
