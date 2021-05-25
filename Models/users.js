const mongoose = require('mongoose')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        minlength: 9,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 0,
        max: 1024,
        required: true
    }
});

function validator(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(9).max(255).required().email(), //this is because this is what we are gonna get from the client
        password: Joi.string().min(0).max(1024).required()
    });
    return schema.validate(body);
}


const User = mongoose.model('user', userSchema);
module.exports.User = User;
module.exports.validator = validator;