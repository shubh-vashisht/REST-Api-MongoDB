const express = require('express');
const route = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')
const { Genre, validator } = require('../Models/genres');




route.get('/', function (req, res) {
    async function getGenres() {
        const ab = await Genre.find().sort('name');
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
        const ans = await Genre.find({ _id: id });
        return ans;
    }
    getting().then(ele => {
        res.send(ele[0])
    }).catch(err => {
        res.status('400').send("Element does not exist");
    });
});

route.post('/', function (req, res) {
    async function createGenres() {
        let ab = new Genre({ name: req.body.name })
        const result = await ab.save();
        return result;
    }
    createGenres(req.body).then((elem) => {
        res.send(elem);
    }).catch(err => {
        res.status('400').send(err.message);
    });
});

route.put('/:id', function (req, res) {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    async function updateGenres() {
        const result = await Genre.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name
            }
        }, { new: true });
        return result;
    }
    updateGenres()
        .then(ele => {
            res.send(ele);
        }).catch(err => {
            res.status('400').send(err.message)
        });
})

route.delete('/:id', function (req, res) {
    let id = (req.params.id);
    async function removeGenres() {
        const course = await Genre.findByIdAndRemove(id);
        return course;
    }
    removeGenres().then((el) => {
        res.send(el);
    }).catch(err => {
        res.send("no file found");
    })
})

route.delete('/delete/all', function (req, res) {

    async function removeGenres() {
        const course = await Genre.deleteMany({ __v: 0 });
        return course;
    }

    removeGenres().then((el) => {
        res.send("deleted everything master!");
    }).catch(err => {
        res.send(err.message);
    })
})


module.exports = route;