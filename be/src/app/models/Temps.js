const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

const Temp = new Schema ({
    name:   { type: String, maxLength: 255, required: true},
    temp:   { type: String, required: true},
});

module.exports = mongoose.model('BBC_TEMP', Temp);