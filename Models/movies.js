const mongoose = require('mongoose')
const Joi = require('joi');
const { GenreSchema } = require('./genres');


const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre: {
        type: GenreSchema,
        required: true,
        ref: "genre"
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

function validator(body) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(), //this is because this is what we are gonna get from the client
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    });
    return schema.validate(body);
}


const Movie = mongoose.model('movies', moviesSchema);
module.exports.Movie = Movie;
module.exports.validate = validator;