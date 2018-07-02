'use strict';

const express = require('express');
const router = express.Route();

module.exports = function (app) {
    const admin = require('../controller/admin.server.controller');

    app.route('/admin/').get(admin.adminIndex);
};