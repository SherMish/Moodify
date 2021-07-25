const express = require('express');
const Entry = require('../models/entry');
const User = require('../models/user')
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();



//return all the entries submited by the username
router.get('/:username', /*passport.authenticate('jwt',{session: false}),*/ (req,res) => {
    User.findOne({username: req.params.username}, (err, user) => {
        if(err) {
            res.json({success: false, msg:err})
            return;
        }

        if (!user) {
            res.json({success: false, msg: "Something went wrong1"});
            return;
        }

        Entry.find({createdBy: user._id}, (err, result) => {
            if(err) {
                res.json({success: false, msg:err})
                return;
            }

            if (!res) {
                res.json({success: false, msg: "Something went wrong2"});
                return;
            }
            res.json({success: true, result});
        })


    })
})




module.exports = router;