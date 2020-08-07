const fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}


function convertFormat(filename, input) {
  const output = {};

  const content = JSON.parse(input);

  console.log(content);

  for (let key in content) {
    const value = content[key];
    console.log(key, value);
    output[key] = { defaultMessage: value };
  }
  const json = JSON.stringify(output);
  fs.writeFile(`translations_output/${filename}`, json, 'utf8', () => console.log('finished!', filename));
}

readFiles('translations_input/', function(filename, content) {
  console.log(filename, content);
  convertFormat(filename, content);
}, function(err) {
  throw err;
});

//
// const output = {};
//
//
//
// const json = JSON.stringify(output);
//
// const fs = require('fs');
// fs.writeFile('translations_json/bs.json', json, 'utf8', () => console.log('finished!'));
