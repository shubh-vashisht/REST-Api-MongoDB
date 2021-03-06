const mongoose = require('mongoose')
const Joi = require('joi');

const customerSchema = {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}

const movieSchema = {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}

const rentalSchema = {
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    },
}

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(rental);
}


const Rental = mongoose.model('rental', rentalSchema);
exports.Rental = Rental;
exports.validate = validateRental;


