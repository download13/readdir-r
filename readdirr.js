var fs = require('fs');
var async = require('async');
var path = require('path');


function readdirr(dir, cb) {
	var files = [];
	var tasks = [];

	// Get directory contents
	fs.readdir(dir, function(err, items) {
		if(err) {
			cb(err);
			return;
		}

		// Make each entry relative to the starting directory
		var absItems = items.map(function(item) {
			return path.join(dir, item);
		});

		// Get info on each entry
		async.map(absItems, fs.stat, function(err, stats) {
			if(err) {
				cb(err);
				return;
			}

			// Sort into files and sub-directories
			items.forEach(function(item, i) {
				var s = stats[i];

				if(s.isFile()) {
					files.push(item);
				}

				if(s.isDirectory()) {
					tasks.push(absItems[i]);
				}
			});

			// Get the contents of each sub-directory
			async.map(tasks, readdirr, function(err, results) {
				if(err) {
					cb(err);
					return;
				}

				results.forEach(function(taskFiles, i) {
					var taskDir = path.relative(dir, tasks[i]);

					taskFiles = taskFiles.map(function(file) {
						return path.join(taskDir, file);
					});

					files = files.concat(taskFiles);
				});

				cb(null, files);
			});
		});
	});
}

module.exports = readdirr;
