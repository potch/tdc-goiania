var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){
    var path = req.url.split('?')[0];
    if (path[path.length-1] == '/') {
        path = path + 'index.html';
    }
    res.end(fs.readFileSync(__dirname+path));
});

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.remoteNext = function() {
  everyone.now.next();
};

everyone.now.remoteStatus = function(n, slide, notes) {
  everyone.now.status(n, slide, notes);
};

everyone.now.remotePrev = function() {
  everyone.now.prev();
};

var port = +process.argv[2] || 9094;
server.listen(port);
console.log('running on port ' + port);
