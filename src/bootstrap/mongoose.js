'use strict';

const config = require('../config/config');

// 加载数据库模块
const mongoose = require('mongoose');

module.exports = function () {
    // use custom mongodb url or localhost
    mongoose.connect(config.database);
    const db = mongoose.connection;

    db.on('error', function (err) {
        console.error('MongoDB连接错误: ' + err);
        process.exit(1);
    });

    // Models
    require('../model/book.server.model');
    require('../model/category.server.model');
    require('../model/chapter.server.model');
    require('../model/user.server.model');

    console.log('Mongodb running at ' + config.db);

    return db;
}