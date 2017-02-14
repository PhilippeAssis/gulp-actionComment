var child_process = require('child_process');
var map = require('map-stream');
var gutil = require('gulp-util');
var actionComment = require('action-comment');

var through = require('through2'); // npm install --save through2

module.exports = function(handles, config) {
    var action = actionComment(config)

    return through.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        // if (file.isStream()) {
        //     this.emit('error', new Error('gulp-action-comment: Streaming not supported'));
        //     return cb(null, file);
        // }

        if (file.isBuffer()) {
            file.contents = new Buffer(action.buffer(file.contents).handles(handles).exec())
        }

        cb(null, file);
    });
};
