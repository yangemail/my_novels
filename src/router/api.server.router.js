'use strict';

const express = require('express');
const router = express.Router();

module.exports = function (app) {
    const api = require('../controller/api.server.controller');

    app.route('/').get(api.index);
};