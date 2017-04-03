const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Page = require('./models/page');
const Admin = require('./models/admin');
const db_configs = require('./db_config');
const crypto = require('crypto');
let token;

mongoose.connect(db_configs['db_path']);

let initAdmin = new Admin({
	name: db_configs['initial_admin'],
	pass: crypto.createHash("sha256").update(db_configs["initial_pass"] + db_configs['pepper']).digest("hex"),
	email: db_configs["initial_email"], 
	created_at: new Date()
})

initAdmin.save((err) => {
	if (err) {
		console.log(err)
		return;
	}

	console.log("you a re ready to go");
})

return;