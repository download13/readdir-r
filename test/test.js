var assert = require('assert');
var path = require('path');
var readdirr = require('../readdirr');

describe('readdirr', function() {
	describe('directory structure', function() {
		it('should be correct for dir1 with relative path', function(done) {
			readdirr(path.join('test', 'dir1'), function(err, files) {
				if(err) throw err;

				assert.equal(files.length, 4);
				assert.deepEqual(files[0].split(path.sep), ['test.txt']);
				assert.deepEqual(files[1].split(path.sep), ['sub1', 'happy2.txt']);
				assert.deepEqual(files[2].split(path.sep), ['sub1', 'happy3.css']);
				assert.deepEqual(files[3].split(path.sep), ['sub2', 'sub2-1', 'test3.js']);

				done();
			});
		});

		it('should be correct for dir1 with absolute path', function(done) {
			readdirr(path.join(__dirname, 'dir1'), function(err, files) {
				if(err) throw err;

				assert.equal(files.length, 4);
				assert.deepEqual(files[0].split(path.sep), ['test.txt']);
				assert.deepEqual(files[1].split(path.sep), ['sub1', 'happy2.txt']);
				assert.deepEqual(files[2].split(path.sep), ['sub1', 'happy3.css']);
				assert.deepEqual(files[3].split(path.sep), ['sub2', 'sub2-1', 'test3.js']);

				done();
			});
		});
	});
});
