const express = require('express');
const Entry = require('../models/entry');
const User = require('../models/user')
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/first-entry', passport.authenticate('jwt',{session: false}), (req,res) => {
    User.findOne({username: req.body.username}, (err, user) =>{
        if (err) {
            res.json({success: false, message: err});
            return;
        }
        if (!user) {
            res.json({success: false, message: "Something went wrong"});
            return;
        }
        Entry.findOne({createdBy: user._id}, (err, entry) => {
            if (err) {
                res.json({success: false, message: err});
                return;
            }
            if (!entry) {
                res.json({success: true, first_entry: true}); //first entry
                return;
            }
            res.json({success: true, first_entry: false}) //not first entry
        })
    })
})


router.post('/entry', passport.authenticate('jwt',{session: false}),  async (req,res) => {
        User.findOne({username: req.body.username}, (err, user) =>{
        if (err) {
            res.json({success: false, message: err});
            return;
        }
        if (!user) {
            res.json({success: false, message: "Something went wrong"});
            return;
        }
        const entry = new Entry({
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
            additional_info: req.body.additional_info,
            createdBy: user._id
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
        });

        Entry.findOne({_id: entry._id})
             .populate('createdBy')
             .exec(function (err, result) {
                if (err) {
                    res.json({result: false, message: err});
                    return;
                }
             });
        res.json({result: true, message:"entry added!"})
    });
})

module.exports = router;
