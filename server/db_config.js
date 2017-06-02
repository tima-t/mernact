//db_configs - Everything you write here is private and secure
const db_configs = {
	// write here your mongo db or other mongo provider address and credentials
	// Example: db_path": "mongodb://admin:mern@ds1615571.mlab.com:61471/install_test"
	"db_path": "",

	// write a random secret word to make passworss more secure
	// Example: pepper": "mySecretWord"
	"pepper": "",

	// write admin name for the control panel
	// Example: "initial_admin":"admin"
	"initial_admin":"",

	// write password for login in admin panel
	// Example: "initial_pass":"admin"
	"initial_pass":"",

	// write the admin email, it should be valid
	// Example: "initial_email": "adminmail@gmail.com",
	"initial_email": "",

	// write the password for admin email, it should be valid
	// Example: "email_pass":"secretPass123",
	"email_pass":""
}
module.exports = db_configs;

