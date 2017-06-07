const express = require('express')
const app = express()
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Page = require('./models/page');
const PageStructure = require("./models/pageStructure");
const Admin = require('./models/admin');
const Property = require('./models/property');
const Component = require('./models/component');
const db_config = require('./db_config');
const crypto = require('crypto');
const multer = require("multer");
const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: db_config['initial_email'],
		pass: db_config['email_pass']
	}
})

let token = Math.random(),
	userName = Math.random();

let storage = multer.diskStorage({
	destination: function (req, file, callback) {
		if (file.originalname.indexOf("mp4") !== -1 || file.originalname.indexOf("webm") !== -1 || file.originalname.indexOf("ogg") !== -1) {
			callback(null, './resources/video');
		}
		else {
			callback(null, './resources/images');
		}
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + '-' + file.originalname);
	}
});

let upload = multer({ storage: storage }).single('userPhoto');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/resources'));
mongoose.connect(db_config['db_path']);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept");
	next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello to MernAct')
})

app.post('/api/send_mail', function (req, res) {
	let mailOptions = {
		to: db_config['initial_email'], // list of receivers
		subject: req.body.subject, // Subject line
		text: req.body.message + "/n/r/r From" + req.body.name + "" + req.body.email, // plain text body
		html: '<b>' + req.body.message + "<br> From " + req.body.name + " - " + req.body.email + '</b>' // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.json({ "resp": error });
		} else {
			res.json({ "resp": "success" });
		}
	});
})


app.post('/api/admin_validate', function (req, res) {
	console.log("login admin");
	console.log(crypto.createHash("sha256").update(req.body.pass + db_config['pepper']).digest("hex"));
	Admin.find({ "name": req.body.name, "pass": crypto.createHash("sha256").update(req.body.pass + db_config['pepper']).digest("hex") }, (err) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
	}).count(function (err, count) {
		console.log(count);
		if (count === 1) {
			crypto.randomBytes(256, (err, buf) => {
				if (err) return err;
				userName = req.body.name;
				token = buf.toString('hex');
				res.json({ "resp": "You are logged", "token": token });
				Admin.update({ "name": req.body.name }, { "token": token });
			});
		}
		else {
			res.json({ "resp": "invalid pass or user name" });
			return;
		}
	});
})

app.get('/api/get_page_structure', function (req, res) {
	PageStructure.find({ page_name: req.query.pageName }, (err, pageStrucutre) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		if (pageStrucutre[0] && pageStrucutre[0].components) {
			res.json({ "resp": { "pageStructure": pageStrucutre[0].components } })
		}
		else {
			res.json({ "resp": { "pageStructure": [] } })
		}



	})
})

//Admin Routes

adminRouter.post('/photo', function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		res.json({ "resp": "Ok" })
	});
});

adminRouter.use(function (req, res, next) {
	console.log(req.query);
	console.log("here auth user");
	console.log("name client", req.body.name);
	console.log("token client", req.body.token);
	console.log(userName);
	console.log(token);
	if ((req.body.name || req.query.name) == userName && (req.body.token || req.query.token) == token) {
		next();
	}
	else {
		res.send(401, " missing auth header");
	}

	// res.json({ "resp": "OK" }) : res.json({ "resp": "You need higher access level" });
})

adminRouter.post('/add_page', function (req, res) {
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

adminRouter.post('/save_page_structure', function (req, res) {
	let pageStructure = {
		page_name: req.body.pageName,
		components: req.body.pageStructure,
		created_at: new Date()
	};

	PageStructure.update({ page_name: req.body.pageName }, pageStructure, { upsert: true, minimize: false }, (err) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		res.json({ "resp": "OK" })
	})
})

adminRouter.get('/get_page_structure', function (req, res) {
	console.log(req.body.pageName);
	PageStructure.find({ page_name: req.query.pageName }, (err, pageStrucutre) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		if (pageStrucutre[0] && pageStrucutre[0].components) {
			res.json({ "resp": { "pageStructure": pageStrucutre[0].components } })
		}
		else {
			res.json({ "resp": { "pageStructure": [] } })
		}

	})
})

adminRouter.post('/remove_page', function (req, res) {
	console.log("remove page");
	console.log(req.body.pageName);
	Page.remove({ "name": req.body.pageName }, (err) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}

		PageStructure.remove({ page_name: req.body.pageName }, (err) => {
			if (err) {
				res.json({ "resp": err });
				return;
			}
		})
		res.json({ "resp": "Page removed" });
	})
})

adminRouter.get('/initial_pages', function (req, res) {
	// get all the pages
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

adminRouter.get('/component_props', function (req, res) {
	console.log("component props ", req.query.component)
	Component.find({ name: req.query.component }, function (err, comp) {
		if (err) {
			res.json({ "resp": err })
			return;
		};
		res.json(
			{
				"resp": { "properties": comp[0]["properties"] }
			});
	});
});

adminRouter.get('/initial_widgets', function (req, res) {
	// get all the widgets
	Component.find({}, function (err, widgets) {
		if (err) {
			res.json({ "resp": err })
			return;
		};
		res.json(
			{
				"resp": { "widgets": widgets }
			});
	}).sort({ name: 1 });
});

app.use("/api/admin", adminRouter);

app.listen(9000, function () {
	console.log('Example app listening on port 9000!')
})

