const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { genPassword } = require('../lib/utils');
const router = express.Router();
const utils = require('../lib/utils');

const saltRounds = 10;

router.post('/register', async (req,res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({success: false,message: "Please fill all the fields"});
    }
    else {
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

            const jwt = utils.issueJWT(savedUser);

            res.json({success: true, user: savedUser, token: jwt.token, expiresIn: jwt.expires
            });
        }
        else if (arrEmail.length > 0) {res.json({success: false, message: "You`ve already created a user with the following email, please login!"})}
            else if (arrUsername.length > 0) {res.json({success: false, message: "Please choose a different username!"})}
        }
        catch(err) {
            res.json({success: false,message: err});
        }
    }
})


router.post('/login',  (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false,message: "Please fill all the fields"});
    }
    else { 
        User.findOne({username: req.body.username}, (err,user) => {
            if (err) res.json({ success: false, message: err});
            if (!user) res/*.status(401)*/.json({ success:false, message: "User could not be found!"})
            else {
                const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

                if(isValid) {
                    const tokenObject = utils.issueJWT(user);

                    res.status(200).json({ success: true, user: user, token: tokenObject.token, expires: tokenObject.expires})
                }
                else {
                    res/*.status(401)*/.json({ success: false, message: "You entered a wrong password"})
                }
        }
            
            
        })
    }
})

router.get('/protected', passport.authenticate('jwt',{session: false}), (req,res,next) => {
    res.status(200).json({success: true, message: "You are authorized"});
});



module.exports = router;
