'use strict';

const User = require('../model/user.server.model');

exports.adminIndex = function (req, res, next) {
    res.render('admin/index_index');
};