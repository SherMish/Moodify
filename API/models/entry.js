const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user')



const EntrySchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    wake_up: String,
    hours_slept: Number,
    work: String,
    study: String,
    romantic_relationship: String,
    social_life: String,
    hobbies: String,
    productive: Number,
    substances: String,
    sexual_activity: String,
    mood: Number,
    additional_info: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Entry', EntrySchema);