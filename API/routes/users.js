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



router.post('/login', passport.authenticate('local', {failureRedirect: 'login-failure', successRedirect: 'login-success'}), /*(req, res, next) => {}*/)

module.exports = router;
