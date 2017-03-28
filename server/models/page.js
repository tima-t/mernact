const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
	name: String,
	created_by: String,
	created_at: Date
})

var Page = mongoose.model('Page', PageSchema);

// make this available to our users in our Node applications
module.exports = Page;
