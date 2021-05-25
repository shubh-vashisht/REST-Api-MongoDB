const express = require('express');
const route = express.Router();
const mongoose = require('mongoose')
const { Customer, validator } = require('../Models/customer');



route.get('/', function (req, res) {
    async function getGenres() {
        const ab = await Customer.find().sort('name');
        return ab;
    }
    getGenres()
        .then(ele => {
            res.send(ele);
        })
        .catch(err => {
            res.send(err.message);
        })
});

route.get('/:id', function (req, res) {
    let id = req.params.id;
    async function getting(identity) {
        const ans = await Customer.find({ _id: id });
        return ans;
    }
    getting().then(ele => {
        res.send(ele[0])
    }).catch(err => {
        res.status('400').send("Element does not exist");
    });
});

route.post('/', function (req, res) {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    async function createCustomer() {
        let ab = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        })
        const result = await ab.save();
        return result;
    }
    createCustomer(req.body).then((elem) => {
        res.send(elem);
    }).catch(err => {
        res.status('400').send(err.message);
    });
});

route.put('/:id', function (req, res) {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    async function updateCustomers() {
        const result = await Customer.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                isGold: req.body.isGold,
                phone: req.body.phone
            }
        }, { new: true });
        return result;
    }
    updateCustomers()
        .then(ele => {
            console.log("update hua");
            res.send(ele);
        }).catch(err => {
            res.status('400').send(err.message)
        });
})

route.delete('/:id', function (req, res) {
    let id = (req.params.id);

    async function removeCustomers() {
        const course = await Customer.findByIdAndRemove(id);
        return course;
    }

    removeCustomers().then((el) => {
        res.send(el);
    }).catch(err => {
        res.send(err.message);
    })
})

route.delete('/delete/all', function (req, res) {

    async function removeCustomers() {
        const course = await Customer.deleteMany({ __v: 0 });
        return course;
    }

    removeCustomers().then((el) => {
        res.send("deleted everything master!");
    }).catch(err => {
        res.send(err.message);
    })
})


module.exports = route;