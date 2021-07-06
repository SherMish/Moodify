const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = require('../models/user');
const validPassword = require('../lib/passwordUtills').validPassword;


//if we had other fields in req.body (not username and password)
// const customFields = {
//     usernameField: 'uname',
//     passwordField: 'pw'
// };


const verifyCallback = (username, password, done) => {
    User.findOne({username: username})
        .then((user) => {

            if (!user) return done(null, false);

            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        })
        .catch((err => {
            done(err);
        }));
}

const stragedy = new LocalStrategy(/*customFields,*/ verifyCallback);

passport.use(stragedy);

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});