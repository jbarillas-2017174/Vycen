'use strict'

const mongoose = require('mongoose');

const forumModel = mongoose.Schema({
    image: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'Company' },
    description: String,
});

module.exports = mongoose.model('Forum', forumModel)