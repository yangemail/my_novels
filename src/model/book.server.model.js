'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_summary: {
        type: String,
        default: ''
    },
    book_name: {
        type: String,
        default: ''
    },
    book_author: String,
    book_serial_wordcount: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    book_last_update_time: {
        type: Date,
        default: Date.now
    },
    book_chapter_url: String,
    book_serial_status: String,
    book_rate_up: Number,
    book_rate_down: Number,
    book_logical_deleted: Boolean,
    comments: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        content: String
    }]
});

module.exports = mongoose.model('Book', bookSchema);