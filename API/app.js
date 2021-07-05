const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const bcrypt = require('bcrypt')
var cors = require('cors');
const session = require('express-session');

const MongoStore = require('connect-mongo');


app = express();

app.use(bodyParser.json());
app.use(cors());



const connect = mongoose.connect(process.env.DB_CONNECT,
                {useNewUrlParser: true, useUnifiedTopology: true});
                
// const sessionStore = new MongoStore({
//     mongooseConnection: mongoose.connection,
//     collection: 'sessions'
// });

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_CONNECT}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1 day
    }
}));

app.use('/api/users', usersRoute);


app.listen(3000, () => {
    console.log("listening on port 3000")
});