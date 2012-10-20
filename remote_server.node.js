var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){
    res.end(fs.readFileSync(__dirname+'/remote.html'));
})

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.remoteNext = function() {
  everyone.now.next();
};

everyone.now.remoteStatus = function(n, notes) {
  everyone.now.status(n, notes);
};

everyone.now.remotePrev = function() {
  everyone.now.prev();
};

var port = +process.argv[2] || 9094;
server.listen(port);
console.log('running on port ' + port);
