const exec = require('child_process').exec;

console.log("Welcome to Mernact!");
exec('cd server && npm install', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
	console.log(`stderr: ${stderr}`);

	exec('cd server && node initial_db_configs.js', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);

	});

	exec('start cmd.exe @cmd /k "cd server && supervisor index.js"', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);

	});

});

exec('cd client && npm install', (error) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}

	exec('npm install -g serve', (error) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}

		exec('cd client && serve build -s', (error) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
		});

		exec('npm install open', (error) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			const open = require('open');
			open('http://localhost:5000');
		});

	});
});





