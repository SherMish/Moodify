const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const router = express.Router();

const saltRounds = 10;

router.post('/register', async (req,res) => {
    try {
    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, saltRounds),
        email: req.body.email
    });
        arr = await User.find({email: user.email}).exec();
        if (arr.length == 0) { 
        const savedUser =  await user.save();
        res.json({success: true});
        }
        else {res.json({success: false, message: "You`ve already created a user with the following email, please login!"})}
    }
    catch(err) {
        res.json({success: false,message: err});
    }
})

module.exports = router;
