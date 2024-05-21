const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const Schema = mongoose.Schema;

const Light = new Schema ({ 
    name:           { type: String, maxLength: 255, required: true},
    light_value:    { type: String, required: true}
});

module.exports = mongoose.model('BBC_LIGHT', Light);