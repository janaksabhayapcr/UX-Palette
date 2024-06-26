const fs = require('fs');

function readFileAsync(filepath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filepath, 'utf8', function (err, content) {
      err ? reject(err) : resolve(content);
    });
  });
}

function statFileAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.stat(path, function (err, stat) {
      return err ? reject(err) : resolve(stat);
    });
  });
}

module.exports = {
  readFileAsync: readFileAsync,
  statFileAsync: statFileAsync,
};
