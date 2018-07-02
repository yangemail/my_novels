const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    chapter_sequence: Number,
    chapter_is_update_required: Boolean,
    chapter_last_update_time: {
        type: Date,
        default: Date.now
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    chapter_seq_chinese: String,
    chapter_title_chinese: String,
    chapter_content: String,
    chapter_url: String,
});

module.exports = mongoose.model('Chapter', chapterSchema);