const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const bcrypt = require('bcrypt')
var cors = require('cors');


app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', usersRoute);
mongoose.connect(process.env.DB_CONNECT,
                {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(3000);