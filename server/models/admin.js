const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	name: String,
	pass: String,
	email: String,
	token: String,
	created_at: Date
})

let Admin = mongoose.model('Admin', AdminSchema);

// make this available to our users in our Node applications
module.exports = Admin;