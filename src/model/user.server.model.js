const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    register_date: Date,
    read_status: [{
        book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
        chapter: {type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
        bookmark_date: Date
    }],
    is_blocked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);