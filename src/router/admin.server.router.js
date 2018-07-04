'use strict';

const express = require('express');
const router = express.Router();

const logic = require('../logic/admin.server.logic');
const {check, validationResult} = require('express-validator/check');

module.exports = function (app) {
    const admin = require('../controller/admin.server.controller');

    app.use('/admin', router);

    router.get('/', admin.adminIndex);

    router.get('/category', admin.category);

    router.get('/category/add', admin.renderCategoryAdd)
        .post('/category/add', admin.categoryAdd);

    router.get('/category/delete', admin.categoryDelete);
};