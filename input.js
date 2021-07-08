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
                //console.log(result);
                console.log(result.name);
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
<form action="/action_page.php">
  <label for="fname">Name:</label>
  <input type="text" id="name" name="name" value=` + result.name+ `><br><br>
  <label for="email">Email:</label>
  <input type="text" id="email" name="email" value=` + result.email + `><br><br>

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

expr.listen(3000, function() {
  console.log('App is running on 3000');
})
