var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    const passport = require('passport')
const User = require('../models/user')

var opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"secret"
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('jwt_Payload',jwt_payload);
    User.findOne(jwt_payload._id).exec()
    .then((user)=>{
        if (user) {
            return done(null, user);
        }
        else{
            return done(null, false);
        }
        
    })
    .catch((err)=>{
        return done(err, false);
    })

}))

module.exports = passport