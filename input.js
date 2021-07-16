    'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const expr = exports.module = express();

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');


//https://attacomsian.com/blog/uploading-files-nodejs-express
expr.use(fileUpload({
    createParentPath: true
}));

expr.use(cors());
expr.use(bodyParser.json());
expr.use(bodyParser.urlencoded({extended: true}));
expr.use(morgan('dev'));

var app = require('./app');
var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"// "mongodb://appt:appt@127.17.0.1:27017/mydb?authSource=admin"


//console.log(__dirname);
expr.use(bodyParser.urlencoded({ extended: true }));

expr.post('/emp1', function(req, res) {
    //console.log(req.body.fnd);
    //console.log(req.body.sections);
    var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;
    if (req.body.sections === "entire"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },

          if (err) throw err;
          var dbo = db.db("mydb");

          var query10 = { $text : { $search : req.body.fnd } };

          dbo.collection("applicants").find(query10).count(function(err, result) {
            if (err) throw err;
            //console.log(result);
            html += result + ' resumes contain \"' + req.body.fnd + '\".<br /><br />';
            //console.log(html);
          });

          dbo.collection("applicants").find(query10).limit(5).toArray(function (err, result) {
              if (err) throw err;
              html += ' Displaying top 5 results: <br />';
              result.forEach(function(doc){
                  //var tmp = JSON.stringify(doc);
                  for (var key in doc){
                    //console.log(key);
                    //console.log(doc[key]);

                    html += key + ": " + doc[key] + '<br />';
                  }
                  html += '<br />';
                  //html += JSON.stringify(doc, null, "\n") + '<br />';
              })
              html += '<br/>'
          });
          //db.close();

        }); //end connect

/*
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query9b = { $text : { $search : req.body.fnd } };
          dbo.collection("applicants").find(query9b).limit(5).toArray(function (err, result) {
            if (err) throw err;
            expect(result[0].name).toEqual('Prem Prakash');
            expect(result[0].email).toEqual('premgautam958@gmail.com');
          });
          db.close();
        }); //end connect*/
    }
    else if (req.body.sections === "education"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "education": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the education section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "summary"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "summary": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the summary section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "objective"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "objective": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the objective section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "skills"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "skills": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the skills section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "experience"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "experience": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the experience section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "projects"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "projects": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the projects section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "technology"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "technology": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the technology section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }
    else if (req.body.sections === "languages"){
        MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query1 = { "languages": { $regex: req.body.fnd, $options: "i" } };
          dbo.collection("applicants").find(query1).count(function(err, result) {
              if (err) throw err;
              //console.log(result);
              html += result + ' resumes contain \"' + req.body.fnd + '\" in the languages section.<br /><br />';
              //console.log(html);
            });

            dbo.collection("applicants").find(query1).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += key + ": " + doc[key] + '<br />';
                    }
                    html += '<br />';
                })
                html += '<br/>'
            });
        });//end connect*/
    }

    setTimeout(function(){
        html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
                </body>
            </html>
        `;

        res.status(200).send(html);
    } , 3000);
})

expr.post('/emp2', function(req, res) {
    var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");

          var query11a = { projection: { _id: 0, "name": 1 } };
          dbo.collection("applicants").find({}, query11a).toArray(function (err, result) {
              if (err) throw err;
              html += ' Displaying list of names: ';
                result.forEach(function(doc){
                    for (var key in doc){
                      html += doc[key] + ', ';
                    }
                })
                html += '<br/><br />'
          });

          var query11b = { projection: { _id: 0, "email": 1 } };
          dbo.collection("applicants").find({}, query11b).toArray(function (err, result) {
              if (err) throw err;
              html += ' Displaying list of emails: ';
              result.forEach(function(doc){
                  for (var key in doc){
                    html += doc[key] + ', ';
                  }
              })
              html += '<br/><br />'
          });

    }); //end connect
    setTimeout(function(){
        html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
                </body>
            </html>
        `;

        res.status(200).send(html);
    } , 3000);
})

expr.post('/emp3', function(req, res) {
    var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");
          if (req.body.status === "interviewed"){
            var query12 = { "interviewed": true }; // or false
              dbo.collection("applicants").find(query12).count(function(err, result) {
                if (err) throw err;
                //console.log(result);
                html += result + ' applicants have been \"' + req.body.status + '\".<br /><br />';
                //console.log(html);
              });
              dbo.collection("applicants").find(query12).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                  result.forEach(function(doc){
                      for (var key in doc){
                        html += key + ": " + doc[key] + '<br />';
                      }
                      html += '<br />';
                  })
                  html += '<br/>'
              });
          }
          else if (req.body.status === "hired"){
            var query12 = { "hired": true }; // or false
              dbo.collection("applicants").find(query12).count(function(err, result) {
                if (err) throw err;
                //console.log(result);
                html += result + ' applicants have been \"' + req.body.status + '\".<br /><br />';
                //console.log(html);
              });
              dbo.collection("applicants").find(query12).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                  result.forEach(function(doc){
                      for (var key in doc){
                        html += key + ": " + doc[key] + '<br />';
                      }
                      html += '<br />';
                  })
                  html += '<br/>'
              });
          }
          else if (req.body.status === "offered"){
            var query12 = { "offered": true }; // or false
              dbo.collection("applicants").find(query12).count(function(err, result) {
                if (err) throw err;
                html += result + ' applicants have been "offered" this job.<br /><br />';
              });
              dbo.collection("applicants").find(query12).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                  result.forEach(function(doc){
                      for (var key in doc){
                        html += key + ": " + doc[key] + '<br />';
                      }
                      html += '<br />';
                  })
                  html += '<br/>'
              });
          }
          else if (req.body.status === "otherOffer"){
            var query12 = { "otherOffer": true }; // or false
              dbo.collection("applicants").find(query12).count(function(err, result) {
                if (err) throw err;
                html += result + ' applicants have another offer.<br /><br />';
              });
              dbo.collection("applicants").find(query12).limit(5).toArray(function (err, result) {
                if (err) throw err;
                html += ' Displaying top 5 results: <br />';
                  result.forEach(function(doc){
                      for (var key in doc){
                        html += key + ": " + doc[key] + '<br />';
                      }
                      html += '<br />';
                  })
                  html += '<br/>'
              });
          }
    }); //end connect
    setTimeout(function(){
        html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
                </body>
            </html>
        `;

        res.status(200).send(html);
    } , 3000);
})

expr.post('/emp4', function(req, res) {
    if (req.body.psn == null || req.body.psn === ""){
        res.redirect("localhost:3000/employer");
        return;
    }
    var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");
          var query16 = { "position": req.body.psn };
          dbo.collection("applicants").find(query16).count(function(err, result) {
            if (err) throw err;
            //console.log(result);
            html += result + ' applicants have applied for \"' + req.body.psn + '\".<br /><br />';
            //console.log(html);
          });
          dbo.collection("applicants").find(query16).limit(5).toArray(function (err, result) {
            if (err) throw err;
            html += ' Displaying top 5 results: <br />';
              result.forEach(function(doc){
                  for (var key in doc){
                    html += key + ": " + doc[key] + '<br />';
                  }
                  html += '<br />';
              })
              html += '<br/>'
          });
    }); //end connect
    setTimeout(function(){
        html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
                </body>
            </html>
        `;

        res.status(200).send(html);
    } , 3000);
})

expr.post('/emp5', function(req, res) {
    if (req.body.stu == null || req.body.stu === ""){
        res.redirect("localhost:3000/employer");
        return;
    }
    var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");
          var query17 = { "name": req.body.stu };
          //console.log(req.body.stu)
          var update;
          if (req.body.sts == "interviewed"){
            update = { $set: { "interviewed": req.body.statusValue } };
          }
          else if (req.body.sts == "hired"){
            update = { $set: { "hired": req.body.statusValue } };
          }
          else if (req.body.sts == "offered"){
            update = { $set: {  "offered": req.body.statusValue } };
          }
          else if (req.body.sts == "otherOffer"){
            update = { $set: { "otherOffer": req.body.statusValue } };
          }

          dbo.collection("applicants").updateMany(query17, update, function (err, result) {
            if (err) throw err;
            //console.log(result);
            html += result.matchedCount + ' applicants are named \"' + req.body.stu + '\".' +
                '&nbsp;&nbsp;Update \"' + req.body.sts + '\" to ' + req.body.statusValue + ':&nbsp;' + result.modifiedCount +
                ' resumes have been updated. <br /><br />';
          });
    }); //end connect

    setTimeout(function(){
        html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
                </body>
            </html>
        `;

        res.status(200).send(html);
    } , 3000);
})

expr.post('/test2', function(req, res) {
   try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let resm = req.files.resume2;
                //console.log(resm);
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                resm.mv('./public/' + resm.name);

/*
                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: resm.name,
                        mimetype: resm.mimetype,
                        size: resm.size
                    }
                });
*/
        }
    } catch (err) {
        res.status(500).send(err);
    }

     app.main();
    var fileName = 'compiled/' + req.files.resume2.name.split('.').slice(0, -1).join('.') + ".json";
        setTimeout( function () {
            let rawdata = fs.readFileSync(fileName);
            let applicant = JSON.parse(rawdata);
            /*console.log(applicant);
            console.log(applicant.name);
            console.log(applicant.email);
                    console.log(applicant.objective);
                            console.log(applicant.education);
                            */

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
            <form action="http://localhost:3001/testCfm" method="POST">
              <label for="name">Name:</label>
              <textarea id="name" name="name" rows="2" cols="50">` + (applicant.name ? applicant.name : "") + `</textarea><br><br>
              <label for="email">Email:</label>
              <textarea id="email" name="email" rows="2" cols="50">` + (applicant.email ? applicant.email : "") + `</textarea><br><br>`;
              if (applicant.objective){
                 html = html + `
                 <label for="objective">Objective:</label>
                             <textarea id="objective" name="objective" rows="4" cols="50">
                             ` + (applicant.objective ? applicant.objective : "") + `
                             </textarea>
                            <br><br>`;
             }
               if (applicant.summary){
                   html = html + `
                   <label for="summary">Summary:</label>
                               <textarea id="summary" name="summary" rows="4" cols="50">
                               ` + (applicant.summary ? applicant.summary : "") + `
                               </textarea>
                           <br><br>`;

               }
            if (applicant.technology){
                html = html + `
                <label for="technology">Technology:</label>
                              <textarea id="technology" name="technology" rows="4" cols="50">
                              ` + (applicant.technology ? applicant.name : "") + `
                              </textarea>
                        <br><br>
                `;
            }
            if (applicant.skills){
                html = html + `
               <label for="skills">Skills:</label>
                     <textarea id="skills" name="skills" rows="4" cols="50">
                     ` + (applicant.skills ? applicant.skills : "") + `
                     </textarea>
             <br><br>`;
            }
            if (applicant.experience){
                html = html + `
              <label for="experience">Experience:</label>
                  <textarea id="experience" name="experience" rows="4" cols="50">
                  ` + (applicant.experience ? applicant.experience : "") + `
                  </textarea>
                  <br><br>`;
            }
            if (applicant.education){
                html = html + `
              <label for="education">Education:</label>
                    <textarea id="education" name="education" rows="4" cols="50">
                    ` + (applicant.education ? applicant.education : "") + `
                    </textarea>
                    <br><br> `;
            }
              if (applicant.languages){
                html = html + `
                    <label for="languages">Languages:</label>
                          <textarea id="languages" name="languages" rows="4" cols="50">
                              ` + (applicant.languages ? applicant.languages : "") + `
                          </textarea>
                `;
              }
              if (applicant.positions){
              html = html + `
              <label for="positions">Languages:</label>
                <textarea id="positions" name="positions" rows="4" cols="50">
                    ` + (applicant.positions ? applicant.positions : "") + `
                </textarea>`;
              }
              html = html + `
              <input type="submit" value="Submit">
            </form>
            </body>
            </html>
            `;
            res.status(200).send(html);
        }, 3000 ) ;

});

expr.post('/test', function(req, res) {
  var resm = req.body.resume;
  //console.log(resm);
    if (resm == null || resm === "") {
        res.redirect("localhost:3000/apply");
        return;
    }

  fs.writeFile('public/resumeInput.txt', resm, function (err) {
    if (err) return console.log(err);
    console.log('Resume > public/resumeInput.txt');
  });

    app.main();

    setTimeout( function () {
        let rawdata = fs.readFileSync('compiled/resumeInput.json');
        let applicant = JSON.parse(rawdata);
        /*console.log(applicant);
        console.log(applicant.name);
        console.log(applicant.email);
                console.log(applicant.objective);
                        console.log(applicant.education);
*/
        var html = `
                <html>
                        <head>
                            <script type="text/javascript">
                            </script>
                            <style>
                            </style>
                        </head>
                        <body topmargin="40" leftmargin="40">
                        <h1>Applicant Dashboard</h1>
        `;
        //html = html + JSON.stringify(result);
        html = html +
        `
        <form action="http://localhost:3001/testCfm" method="POST">
          <label for="name">Name:</label>
          <textarea id="name" name="name" rows="2" cols="50">` + (applicant.name ? applicant.name : "") + `</textarea><br><br>
          <label for="email">Email:</label>
          <textarea id="email" name="email" rows="2" cols="50">` + (applicant.email ? applicant.email : "") + `</textarea><br><br>`;
          if (applicant.objective){
             html = html + `
             <label for="objective">Objective:</label>
                         <textarea id="objective" name="objective" rows="4" cols="50">
                         ` + (applicant.objective ? applicant.objective : "") + `
                         </textarea>
                        <br><br>`;
         }
           if (applicant.summary){
               html = html + `
               <label for="summary">Summary:</label>
                           <textarea id="summary" name="summary" rows="4" cols="50">
                           ` + (applicant.summary ? applicant.summary : "") + `
                           </textarea>
                       <br><br>`;

           }
        if (applicant.technology){
            html = html + `
            <label for="technology">Technology:</label>
                          <textarea id="technology" name="technology" rows="4" cols="50">
                          ` + (applicant.technology ? applicant.name : "") + `
                          </textarea>
                    <br><br>
            `;
        }
        if (applicant.skills){
            html = html + `
           <label for="skills">Skills:</label>
                 <textarea id="skills" name="skills" rows="4" cols="50">
                 ` + (applicant.skills ? applicant.skills : "") + `
                 </textarea>
         <br><br>`;
        }
        if (applicant.experience){
            html = html + `
          <label for="experience">Experience:</label>
              <textarea id="experience" name="experience" rows="4" cols="50">
              ` + (applicant.experience ? applicant.experience : "") + `
              </textarea>
              <br><br>`;
        }
        if (applicant.education){
            html = html + `
          <label for="education">Education:</label>
                <textarea id="education" name="education" rows="4" cols="50">
                ` + (applicant.education ? applicant.education : "") + `
                </textarea>
                <br><br> `;
        }
          if (applicant.languages){
            html = html + `
                <label for="languages">Languages:</label>
                      <textarea id="languages" name="languages" rows="4" cols="50">
                          ` + (applicant.languages ? applicant.languages : "") + `
                      </textarea>
            `;
          }
          if (applicant.positions){
          html = html + `
          <label for="positions">Languages:</label>
            <textarea id="positions" name="positions" rows="4" cols="50">
                ` + (applicant.positions ? applicant.positions : "") + `
            </textarea>`;
          }
          html = html + `
          <label for="jobTitle">Job Title:</label>
          <textarea id="jobTitle" name="jobTitle" rows="4" cols="50">
          </textarea>`;
          html = html + `
          <input type="submit" value="Submit">
        </form>
        <a href="http://localhost:3000/apply">Return to the applicant apply page.</a>
        </body>
        </html>
        `;
        res.status(200).send(html);
    }, 3000 ) ;

})

expr.post('/testCfm', function(req, res) {
      var resm = req.body;
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



expr.listen(3001, function() {
  console.log('App is running on 3001');
})
