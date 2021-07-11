const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
const usersRoute = require('./routes/users');
const path = require('path');

const MongoStore = require('connect-mongo');



/**
 * -------------- GENERAL SETUP ----------------
 */
 require('dotenv').config();
app = express();

app.use(express.json());
app.use(cors());
require('./config/database');



// /**
//  * -------------- SESSION SETUP ----------------
//  */


//  app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({mongoUrl: process.env.DB_CONNECT}),
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 //1 day
//     }
// }));


/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */


// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// Must first load the models
require('./models/user');

app.use(passport.initialize());
//app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

app.use('/api/users', usersRoute);


app.listen(3000, () => {
    console.log("listening on port 3000")
});