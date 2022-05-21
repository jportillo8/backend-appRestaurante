const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const User = require('../models/user');


module.exports = (passport) => {
    console.log('Estoy en passport.js');
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
        console.log('*****Passport findById:', user);
        User.findById(jwt_payload.id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
}

