const mongoose = require('mongoose');
const User = require('../models/user')

const EntrySchema = mongoose.Schema({
   // createdBy: User,
    date: {
        type: Date,
        default: Date.now
    },
    wake_up: String,
    hours_slept: Number,
    mood: {
        morning: Number,
        afternoon: Number,
        evening: Number,
        overall: Number,
    },
    substances: {
        alcohol: Boolean,
        marijuana: Boolean,
    },
    romantic_relationship: {
        exists: Boolean,
        comment: String
    },
    social_life: {
        exists: Boolean,
        comment: String
    },
    work: {
        exists: Boolean,
        comment: String
    },
    study: {
        exists: Boolean,
        comment: String
    },
    hobbies: {
        exists: Boolean,
        comment: String
    },
    sexual_activity: {
        exists: Boolean,
        comment: String
    },
    productive: Number,
    additional_info: String
});

module.exports = mongoose.model('Entry', EntrySchema);