const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Page = require('./models/page');
const db_config = require('./db_config');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(db_config);

app.all('/', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world')
})

app.post('/api/add_page', function (req, res) {
	console.log(req.body.pageName);
	let curPage = new Page({
		name: req.body.pageName,
		created_by: 'admin',
		created_at: new Date()
	})

	curPage.save((err) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		res.json({ "resp": "OK" })
	})
})

app.post('/api/remove_page', function (req, res) {
	console.log("remove page");
	console.log(req.body.pageName);
	Page.remove({"name": req.body.pageName},(err) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		res.json({ "resp": "Page removed" });
	})
})

app.get('/api/initial_pages', function (req, res) {
	// get all the users
	Page.find({}, function (err, pages) {
		if (err) {
			res.json({ "resp": err })
			return;
		};
		res.json(
			{
				"resp": { "pages": pages }
			});
	});
});

app.listen(9000, function () {
	console.log('Example app listening on port 9000!')
})
