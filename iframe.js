var fs = require('fs');
var path = require('path');
var http = require('http');
var util = require('util')
var exec = require('child_process').exec;

var dirTree = ('./src');

var diretoryTreeToObj = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);
        var pending = list.length;
        if (!pending)
            return done(null, {name: path.basename(dir), children: results});
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file)
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push({
                        name: path.basename(file)
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};

// write results to json
diretoryTreeToObj(dirTree, function(err, res){
    if(err)
        console.error(err);
    fs.writeFileSync('./viewer/directory.json', JSON.stringify(res)); 
});

// serve up index page with new iframe urls
function puts(error, stdout, stderr) { util.puts(stdout) }
exec("http-server");
exec("open http://127.0.0.1:8081/viewer/iframe.html");
console.log('Server running at http://localhost:8000');