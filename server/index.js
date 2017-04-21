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
let token = Math.random(),
	userName = Math.random();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(db_config['db_path']);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept");
	next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world')
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

//Admin Routes
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

	PageStructure.update({page_name:req.body.pageName},pageStructure,{upsert:true, minimize: false },(err) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		res.json({ "resp": "OK" })
	})
})

adminRouter.get('/get_page_structure', function (req, res) {
	console.log(req.body.pageName);
	PageStructure.find({page_name: req.query.pageName},(err, pageStrucutre) => {
		if (err) {
			res.json({ "resp": err });
			return;
		}
		if(pageStrucutre[0] && pageStrucutre[0].components ){
			res.json({ "resp": { "pageStructure" : pageStrucutre[0].components} })
		}
		else{
			res.json({"resp": {"pageStructure" : []} })
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
	Component.find({name: req.query.component}, function (err, comp) {
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
	});
});

app.use("/api/admin", adminRouter);

app.listen(9000, function () {
	console.log('Example app listening on port 9000!')
})

