const exec = require('child_process').exec;
const open = require('open');
exec('start cmd.exe @cmd /k "cd server && supervisor index.js"', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
	console.log(`stderr: ${stderr}`);

});

exec('cd client & serve build -s', (error) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
});

open('http://localhost:5000');

