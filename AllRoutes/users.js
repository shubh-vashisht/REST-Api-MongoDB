const { User, validator } = require('../Models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(`User with given email ${req.body.email} already exists!!!`);

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
