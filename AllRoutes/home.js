const express = require('express');
const route = express.Router();

route.get('/', function (req, res) {
    res.send('Hello and welcome to SHUBHS EPIC VIDLY APP');
});

module.exports = route;

