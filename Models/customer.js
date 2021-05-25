const mongoose = require('mongoose')
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 11,
        required: true
    }
});

function validator(body) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(5).max(11).required()
    });
    return schema.validate(body);
}


const Customer = mongoose.model('Customer', customerSchema);
module.exports.Customer = Customer;
module.exports.validator = validator;