    'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const expr = exports.module = express();

var app = require('./app');
var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://appt:appt@127.17.0.1:27017/mydb?authSource=admin"


console.log(__dirname);
expr.use(bodyParser.urlencoded({ extended: true }));

expr.post('/test', function(req, res) {
  var resm = req.body.resume;
  //console.log(resm);

  fs.writeFile('public/resumeInput.txt', resm, function (err) {
    if (err) return console.log(err);
    console.log('Resume > public/resumeInput.txt');
  });

    app.main();

    setTimeout(function(){

        let rawdata = fs.readFileSync('compiled/resumeInput.json');
        let applicant = JSON.parse(rawdata);
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
            dbo.collection("applicants").findOne(applicant, function(err, result) {
                if (err) throw err;
                console.log(result);

                var html = `
                        <html>
                                <head>
                                    <script type="text/javascript">
                                    </script>
                                </head>
                                <body topmargin="40" leftmargin="40">
                                    You are redirected here after submitting text input.
                `;
                html = html + JSON.stringify(result);
                html = html + `
                                 </body>
                                </html>
                        `

                res.status(200).send(html);

                db.close();
            });
        });
    },3000);


})

expr.listen(3000, function() {
  console.log('App is running on 3000');
})
