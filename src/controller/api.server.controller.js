'use strict';

const Category = require('../model/category.server.model');
const path = require('path');
// const log = require()

exports.index = function (req, res, next) {
    Category.findOne().then(function (category) {
        if (category) {
            return category.populate(['book'])
        }
    }).then(function (category) {
        if (category) {
            console.log('#### I am here');
            res.render('api/index_index', {});
        }
        console.log('#### I am NOT here');
    });

};