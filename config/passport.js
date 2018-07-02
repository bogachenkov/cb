const key = require('./keys').secretOrKey;
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const Profile = require('../models/Profile');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;


module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Profile.findById(jwt_payload.id)
      .then(profile => {
        if (profile) {
          return done(null, profile);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err))
  }))
}
