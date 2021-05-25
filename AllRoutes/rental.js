const { Rental, validate } = require('../Models/rental');
const { Movie } = require('../Models/movies');
const { Customer } = require('../Models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
Fawn.init(mongoose);
router.get('/', async (req, res) => {
    const rental = await Rental.find();
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
    //     return res.status(400).send('Invalid Customer, Customer Id does not exist!');
    // }
    // if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
    //     return res.status(400).send('Invalid Movie, Movie Id does not exist!');
    // }

    const customer1 = await Customer.findById(req.body.customerId);
    if (!customer1) return res.status(400).send('Invalid customerId.');

    const movie1 = await Movie.findById(req.body.movieId);
    if (!movie1) return res.status(400).send('Invalid movieID.');
    let rental = new Rental({
        customer: {
            _id: customer1._id,
            name: customer1.name,
            phone: customer1.phone
        },
        movie: {
            _id: movie1._id,
            title: movie1.title,
            dailyRentalRate: movie1.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie1._id }, {
                $inc: { numberInStock: -1 }
            }).run()
    } catch (err) {
        res.status(500).send("something bad happened here");
    }
    res.send(rental);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //bad implementation
    // if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
    //     return res.status(400).send('Inavlid Customer, Customer Id does not exist!');
    // }
    // if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
    //     return res.status(400).send('Inavlid Movie, Movie Id does not exist!');
    // }
    const customer1 = await Customer.findById(req.body.customerId);
    if (!customer1) return res.status(400).send('Invalid customerId.');

    const movie1 = await Movie.findById(req.body.movieId);
    if (!movie1) return res.status(400).send('Invalid movieID.');

    const rental = await Rental.findByIdAndUpdate(req.params.id,
        {
            customer: customer1,
            movie: movie1,
            numberInStock: movie1.numberInStock,
            dailyRentalRate: movie1.dailyRentalRate
        }, { new: true });

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    movie1.numberInStock--;
    res.send(rental);
});

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;