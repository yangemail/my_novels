'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

categorySchema.virtual('book', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'category'
})

module.exports = mongoose.model('Category', categorySchema);