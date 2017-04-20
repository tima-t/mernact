const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageStructureSchema = new Schema({
	page_name: String,
	components: Array,
	created_at: Date
})

let PageStructure = mongoose.model('PageStructure', PageStructureSchema);

// make this available to our users in our Node applications
module.exports = PageStructure;