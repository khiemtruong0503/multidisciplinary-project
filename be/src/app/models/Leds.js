const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const Schema = mongoose.Schema;

const Led = new Schema ({
    name:       { type: String, maxLength: 255, required: true},
    value:      { type: String, maxLength: 255, required: true},
});

module.exports = mongoose.model('BBC_LED', Led);