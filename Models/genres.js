const Joi = require('joi');
const mongoose = require('mongoose')
const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    }
});

function validator(body) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(body);
}

const Genre = mongoose.model('Genres', GenreSchema);
exports.GenreSchema = GenreSchema;
exports.Genre = Genre;
exports.validator = validator;

