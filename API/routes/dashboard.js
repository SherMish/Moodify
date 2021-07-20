const express = require('express');
const Entry = require('../models/entry');
const User = require('../models/user')
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/first-entry', passport.authenticate('jwt',{session: false}), (req,res) => {
    User.findOne({username: req.body.username}, (err, user) =>{
        if (err) {
            res.json({success: false, message: err});
            return;
        }
        if (!user) {
            res.json({success: false, message: "Something went wrong1"});
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
            res.json({success: false, message: "Something went wrong2"});
            return;
        }
        const entry = new Entry({
            wake_up: req.body.entry.wake_up,
            hours_slept: req.body.entry.hours_slept,
            work: req.body.entry.work,
            study: req.body.entry.study,
            romantic_relationship: req.body.entry.romantic_relationship,
            social_life: req.body.entry.social_life,
            hobbies: req.body.entry.hobbies,
            productive: req.body.entry.productive,
            substances: req.body.entry.substances,
            sexual_activity: req.body.entry.sexual_activity,
            mood: req.body.entry.mood,
            additional_info: req.body.entry.additional_info,
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
        res.json({success: true, message:"entry added!"})
    });
})

module.exports = router;
