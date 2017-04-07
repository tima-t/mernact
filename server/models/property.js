const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropSchema = new Schema({
	name: String,
	value: String
})

let Property = mongoose.model('Property', PropSchema);

// make this available to our users in our Node applications
module.exports = Property;