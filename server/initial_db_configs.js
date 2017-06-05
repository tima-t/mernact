const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Page = require('./models/page');
const PageStructure = require('./models/pageStructure');
const Admin = require('./models/admin');
const Property = require('./models/property');
const Component = require('./models/component');
const db_configs = require('./db_config');
const db_init_json = require('./db_init_configs_json');
const crypto = require('crypto');
let token;

mongoose.connect(db_configs['db_path']);

// Setup initial Admin
let initAdmin = new Admin({
	name: db_configs['initial_admin'],
	pass: crypto.createHash("sha256").update(db_configs["initial_pass"] + db_configs['pepper']).digest("hex"),
	email: db_configs["initial_email"],
	created_at: new Date()
})

initAdmin.save((err) => {
	if (err) {
		console.log(err)
		console.log("Error in admin setup");
		return;
	}

	console.log("Admin is set up succesfully");
})

// //Initial properies
// for (let property of db_init_json['initialProperties']) {
// 	let initialProperty = new Property({
// 		name: property["name"],
// 		value: property['value']
// 	});
// 	// initialProperty.ensureIndex({"name": property['name']}, {unique : true});
// 	initialProperty.save((err) => {
// 		if (err) {
// 			console.log(err)
// 			console.log("Error in property setup");
// 			return;
// 		}
// 	})
// }

// console.log("all properties are set succesfully");

//Inital home page
let curPage = new Page({
	name: "home",
	created_by: 'admin',
	created_at: new Date()
})

curPage.save((err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Home page added!");
})

// Inital structure of home page
let pageStructure = new PageStructure( {
	page_name: "home",
	components: db_init_json['homePageStructure'],
	created_at: new Date()
});

pageStructure.save((err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Home page structure added!");
})


//Initial components
for (let comp of db_init_json['initialComponents']) {
	let initialComponent = new Component({
		name: comp["name"],
		properties: comp['properties']
	});
	// initialProperty.ensureIndex({"name": property['name']}, {unique : true});
	initialComponent.save((err) => {
		if (err) {
			console.log(err)
			console.log("Error in components setup");
			return;
		}
	})
}

console.log("all components are set succesfully")


return;