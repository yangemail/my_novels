'use strict';

const User = require('../model/user.server.model');
const Category = require('../model/category.server.model');
const Book = require('../model/book.server.model');
const Chapter = require('../model/chapter.server.model');

exports.adminIndex = function (req, res, next) {
    res.render('admin/index_index');
};

exports.category = function (req, res, next) {
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0;
    let skip = (page - 1) * limit;

    Category.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 取值不能超过pages
        page = Math.min(page, pages);
        // 取值不能小于1
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;

        Category.find().sort({sequence: 1}).limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                categories: categories,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });
    });
};

exports.renderCategoryAdd = function (req, res, next) {
    res.render('admin/category_add', {});
};

exports.categoryAdd = function (req, res, next) {
    let name = req.body.name || '';
    let sequence = req.body.sequence || 0;

    if (name == '') {
        res.render('admin/error', {
            message: '名称不能为空'
        });
    }

    // 数据库中是否已经存在同名分类名称
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            // 数据库中已经存在该分类了
            res.render('admin/error', {
                message: '分类已经存在了'
            })
            return Promise.reject();
        }
        // 数据库中不存在该分类，可以保存
        return new Category({
            name: name,
            sequence: sequence
        }).save();
    }).then(function (newCategory) {
        res.render('admin/success', {
            message: '分类保存成功',
            url: '/admin/category'
        });
        return;
    });
};

exports.categoryDelete = function (req, res, next) {
    // 获取要删除的分类ID
    let id = req.query.id || '';

    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            message: '删除成功',
            url: '/admin/category'
        });
    });
};