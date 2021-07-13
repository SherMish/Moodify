const express = require('express');
const Entry = require('../models/entry');
const User = require('../models/user')
const passport = require('passport');
const router = express.Router();

router.post('/entry', async (req,res) => {
    var createdBy;
    User.findOne({username: req.body.username}, (err, user) =>{
        if (err) {
            res.json({success: false, message: err});
            return;
        }
        if (!user) {
            res.json({success: false, message: "Something went wrong1"});
            return;
        }
        createdBy = user;
        
    });

    const entry = new Entry({
       // createdBy: user,
        wake_up: req.body.wake_up,
        hours_slept: req.body.hours_slept,
        mood: req.body.mood,
        substances: req.body.substances,
        romantic_relationship: req.body.romantic_relationship,
        social_life: req.body.social_life,
        work: req.body.work,
        study: req.body.study,
        hobbies: req.body.hobbies,
        sexual_activity: req.body.sexual_activity,
        productive: req.body.productive,
        additional_info: req.body.additional_info
    });

    entry.save((err, entry) => {
        if (err) {
            res.json({success: false, message: err});
            return;
        }
        if (!entry) {
            res.json({success: false, message: "Something went wrong2"});
            return;
        }
        const new_entry = entry;
        res.json({result: true, message:"entry added!", en:new_entry, userId: user_id})
    });
})

module.exports = router;



