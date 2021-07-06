const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var cors = require('cors');
const session = require('express-session');
const connection = require('./config/database');
const usersRoute = require('./routes/users');

const MongoStore = require('connect-mongo');





/**
 * -------------- GENERAL SETUP ----------------
 */
 require('dotenv').config();
app = express();

app.use(express.json());
app.use(cors());



/**
 * -------------- SESSION SETUP ----------------
 */


 app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_CONNECT}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1 day
    }
}));
                


/**
 * -------------- ROUTES ----------------
 */


app.use('/api/users', usersRoute);
app.get('/', (req,res,next) => {
    console.log(req.session);
    res.send('<h1>Hello World</h1>')
})



app.listen(3000, () => {
    console.log("listening on port 3000")
});