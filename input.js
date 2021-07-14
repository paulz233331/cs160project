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


//console.log(__dirname);
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
                //console.log(result.name);
                //console.log(result.name);
                var html = `
                        <html>
                                <head>
                                    <script type="text/javascript">
                                    </script>
                                </head>
                                <body topmargin="40" leftmargin="40">
                                    You are redirected here after submitting text input.
                `;
                //html = html + JSON.stringify(result);
                html = html +
                `
                <form action="http://localhost:3000/testCfm" method="POST">
                  <label for="name">Name:</label>
                  <textarea id="name" name="name" rows="2" cols="50">` + result.name + `</textarea><br><br>
                  <label for="email">Email:</label>
                  <textarea id="email" name="email" rows="2" cols="50">` + result.email + `</textarea><br><br>
                  <label for="objective">Objective:</label>
                    <textarea id="objective" name="objective" rows="4" cols="50">
                    ` + result.objective + `
                    </textarea>
                   <br><br>
                  <label for="summary">Summary:</label>
                    <textarea id="summary" name="summary" rows="4" cols="50">
                    ` + result.summary + `
                    </textarea>
                <br><br>
                  <label for="technology">Technology:</label>
                      <textarea id="technology" name="technology" rows="4" cols="50">
                      ` + result.technology + `
                      </textarea>
                <br><br>
                  <label for="skills">Skills:</label>
                        <textarea id="skills" name="skills" rows="4" cols="50">
                        ` + result.skills + `
                        </textarea>
                <br><br>
                  <label for="experience">Experience:</label>
                      <textarea id="experience" name="experience" rows="4" cols="50">
                      ` + result.experience + `
                      </textarea>
                      <br><br>
                  <label for="education">Education:</label>
                        <textarea id="education" name="education" rows="4" cols="50">
                        ` + result.education + `
                        </textarea>
                        <br><br>
                  <label for="skype">Skype:</label>
                  <input type="text" id="skype" name="skype" value=` + result.skype + `><br><br>
                  <input type="submit" value="Submit">
                </form>
                `;
                html = html + `
                                 </body>
                                </html>
                        `;

                res.status(200).send(html);

                db.close();
            });
        });
    },3000);
})

expr.post('/testCfm', function(req, res) {
      var resm = req.body
        setTimeout(function(){
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
              if (err) throw err;
              var dbo = db.db("mydb");
                dbo.collection("applicants").findOne({name: resm.name, email: resm.email}, function(err, result) {
                    if (err) throw err;
                    if (result == null){
                        dbo.collection("applicants").insertOne(resm, function(err, res) {
                            if (err) throw err;
                            var newValues = { $set: {hired: false, offered: false, interviewed: false, position : "", otherOffer : false } };
                            console.log(resm);
                            dbo.collection("applicants").updateOne({_id: resm._id}, newValues , function(err, res) {
                                                        if (err) throw err;
                                                      });
                            console.log("1 document inserted");
                            db.close();
                        });
                    }
                    else{
                        dbo.collection("applicants").updateOne(result, {$set : resm }, function(err, result) {
                            if (err) throw err;
                            console.log("1 document updated");
                            db.close();
                        });
                    }
                });

            var html = `<p>You submitted a resume</p>`
            res.status(200).send(html);



            })
        },3000);


} )



expr.listen(3000, function() {
  console.log('App is running on 3000');
})
