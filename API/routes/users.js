const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { genPassword } = require('../lib/passwordUtills');
const passport = require('passport');
const router = express.Router();

const saltRounds = 10;

router.post('/register', async (req,res) => {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    try {
    const user = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        email: req.body.email
    });
        let arrEmail = await User.find({email: user.email}).exec();
        let arrUsername = await User.find({username: user.username}).exec();
        if (arrEmail.length == 0 && arrUsername.length == 0) { 
        const savedUser =  await user.save();
        res.json({success: true});
        }
        else if (arrEmail.length > 0) {res.json({success: false, message: "You`ve already created a user with the following email, please login!"})}
        else if (arrUsername.length > 0) {res.json({success: false, message: "Please choose a different username!"})}
    }
    catch(err) {
        res.json({success: false,message: err});
    }
})


//passport.authenticate calls passport.serializeUser which adds a passport object to the session with userId in it(req.session.passport.user)
//example:
// Session {
//     cookie: {
//       path: '/',
//       _expires: 2021-07-07T17:38:09.912Z,
//       originalMaxAge: 86400000,
//       httpOnly: true
//     },
//     passport: { user: '60e4941b8133a40eac7dc66c' }

//ALSO, it calls passport.deserializeUser which adds a user object to req object (req.user).
//example:
// {
//     _id: 60e4941b8133a40eac7dc66c,
//     username: 'aaaaaa',
//     hash: 'f482731fe910c95b16bbe058c07fc2c6c4e3979437feb5566b7d137f5bb175a38cb5a67f52b229dab451188d40f94610d81f3c683c24e2c35e2798f71a36b7e7',
//     salt: '8af02edd9e1c810cca25b13895c55b8d6225dce9dc44be86b29296867c92322d',
//     email: 'aaaaaaa',
//     date: 2021-07-06T17:34:19.179Z,
//     __v: 0
//   }
//to see it, add the following middleware:
// app.use((req,res,next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// })
router.post('/login', passport.authenticate('local', {failureRedirect: 'login-failure', successRedirect: 'login-success'}), /*(req, res, next) => {}*/)


router.get ('/login-success', (req,res,next) => {
    res.json('successful authentication');
    next();
})

router.get('/protected-route', (req,res,next) => {
    res.json({success: req.isAuthenticated()});
    next();
})

router.get('/logout', (req,res,next) => {
    req.logout(); // deletes req.session.passport.user property
    res.json('disconnected successfuly');
    next();
})
module.exports = router;
