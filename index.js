//modules
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/vidlyApp', { useNewUrlParser: true })
    .then(() => { console.log('connected to mongodb databse called Vdily App') })
    .catch(err => { console.log('couldnt connect to mongodb', err) });
const genres = require('./AllRoutes/genres');
const home = require('./AllRoutes/home');
const customers = require('./AllRoutes/customers')
const movies = require('./AllRoutes/movies')
const rental = require('./AllRoutes/rental')
const user = require('./AllRoutes/users');


//middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', user);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/rental', rental);
app.use('/api/customers', customers);
app.use('/', home);


const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`Starting a server at port ${port}`);
}); //starts a server at this specific port