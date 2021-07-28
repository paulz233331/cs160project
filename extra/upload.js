var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
const path = require('path');
var app = require('./app');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '\public/' + files.filetoupload.name.split('.').slice(0, -1).join('.') +
       "Upload" + path.parse(files.filetoupload.name).ext;

      /*fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });*/

	    mv(oldpath, newpath, function(err){
	        if (err) throw err;
	        //res.write('File uploaded and moved!');
	    });
		res.end();
	    app.main();
	    	
	})
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);