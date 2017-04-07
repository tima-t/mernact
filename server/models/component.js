const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
	name: String,
	properties: Array,
})

let Component = mongoose.model('Component', ComponentSchema);

// make this available to our users in our Node applications
module.exports = Component;