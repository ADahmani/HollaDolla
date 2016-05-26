var file     = require('file');
var path     = require('path');
var mongoose = require('mongoose');
var config   = require('config');

// We need to wait for a little bit to get the db started up before we nuke it
var NUKE_WAIT_TIME_MS = 2000;

file.walkSync(__dirname + '/models', function(dirPath, dirs, files) {
  files.forEach(function(file) {
    if (file.substring(0, 1) !== '.') require(path.join(dirPath, file));
  });
});

var alreadyInitialized = false;

exports.initialize = function(test) {
  if (alreadyInitialized) return;
  alreadyInitialized = true;

  var connectionStr = config.mongo.connectionString;

  if (test) connectionStr = config.mongo.test_connection_string;

  var options = {
    server: {
      socketOptions: {
        keepAlive: 120,
        connectTimeoutMS: 60000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 120,
        connectTimeoutMS: 60000
      }
    }
  };

  return mongoose.connect(
    connectionStr,
    options
  );
};

exports.nuke = function(cb) {
  cb = cb || function() {};
  setTimeout(function() {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) {
        console.log(err);
        return cb('failed_nuke');
      } else {
        console.log('Successfully dropped db');
      }
      cb();
    });
  }, NUKE_WAIT_TIME_MS);
};
