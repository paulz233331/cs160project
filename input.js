// ~~~~~~~~~~~~~~~~~~~~~~ NEW CODE
  
'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const expr = exports.module = express();

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const readline = require('readline');


//https://attacomsian.com/blog/uploading-files-nodejs-express
expr.use(fileUpload({
  createParentPath: true
}));

expr.use(cors());
expr.use(bodyParser.json());
expr.use(bodyParser.urlencoded({ extended: true }));
expr.use(morgan('dev'));

var app = require('./app');
var mongo = require('mongodb');
const { result } = require('underscore');

var MongoClient = mongo.MongoClient;
var url = "1";//"mongodb://54.205.24.189:27017/mydb" // <-- AWS url
// DOCKER URL = "mongodb://appt:appt@127.17.0.1:27017/mydb?authSource=admin"

// create 'compiled' folder
fs.access('./compiled', fs.constants.F_OK, (err) => {
  if (err) { // if compiled does not exist
      fs.mkdir(path.join(__dirname, 'compiled'), (err) => { // create compiled
          if (err) throw err;
          console.log("'compiled' folder created!");
      });
    }
});

// create 'public' folder
fs.access('./public', fs.constants.F_OK, (err) => {
  if (err) { // if compiled does not exist
      fs.mkdir(path.join(__dirname, 'public'), (err) => { // create compiled
          if (err) throw err;
          console.log("'public' folder created!");
      });
    }
});

//console.log(__dirname);
expr.use(bodyParser.urlencoded({ extended: true }));

expr.post('/emp1', function (req, res) {
  //console.log(req.body.fnd);
  //console.log(req.body.sections);
  var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-weight:normal;
                }
                </style>
            </head>
            <body topmargin="40" leftmargin="40" >
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background-color: #EBF5EE; padding:20px;border-radius:5px; box-shadow:5px 5px 10px #888888;">
                <h1 style="font-size:3rem;font-family:verdana;">Results</h1> <br /><br />
                <div style="z-index: 10;height:12px; width:80px; background-color:dodgerblue; margin-bottom: 18px; "></div>
    `;
  if (req.body.sections === "entire") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },

      if (err) throw err;
      var dbo = db.db("mydb");

      var query10 = { $text: { $search: req.body.fnd } };

      dbo.collection("test").find(query10).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\".<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query10).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    }); //end connect
  }
  else if (req.body.sections === "education") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "education": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the education section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "summary") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "summary": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the summary section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "objective") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "objective": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the objective section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "skills") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "skills": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the skills section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "experience") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "experience": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the experience section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "projects") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "projects": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the projects section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "technology") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "technology": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the technology section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }
  else if (req.body.sections === "languages") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "languages": { $regex: req.body.fnd, $options: "i" } };
      dbo.collection("test").find(query1).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' resumes contain \"' + req.body.fnd + '\" in the languages section.<br /><br />';
        //console.log(html);
      });

      dbo.collection("test").find(query1).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });//end connect*/
  }

  setTimeout(function () {
    html = html + `
                    <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;" href="http://localhost:3000/employer">Return to employer page</a>
                    </div>
                    </body>
            </html>
        `;

    res.status(200).send(html);
  }, 3000);
})

expr.post('/emp2', function (req, res) {
var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-weight:normal;
                }
                </style>
            </head>
            <body topmargin="40" leftmargin="40" >
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background-color: #EBF5EE; padding:20px;border-radius:5px; box-shadow:5px 5px 10px #888888;">
                <h1 style="font-size:3rem;font-family:verdana;">Results</h1> <br /><br />
                <div style="z-index: 10;height:12px; width:80px; background-color:dodgerblue; margin-bottom: 18px; "></div>
    `;
  
  MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
    if (err) throw err;
    var dbo = db.db("mydb");

    var query11a = { projection: { _id: 0, "name": 1 } };
    dbo.collection("test").find({}, query11a).toArray(function (err, result) {
      if (err) throw err;
      html += ' <h2>Displaying list of names: </h2>';
      result.forEach(function (doc) {
        html += '<div style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
        for (var key in doc) {
          html += doc[key]
        }
        html += '</div><br /><br />';
      })
      html += '<br/><br />'
    });

    var query11b = { projection: { _id: 0, "email": 1 } };
    dbo.collection("test").find({}, query11b).toArray(function (err, result) {
      if (err) throw err;
      html += ' <h2>Displaying list of emails: </h2>';
      result.forEach(function (doc) {
        html += '<div style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
        for (var key in doc) {
          html += doc[key];
        }
        html += '</div><br /><br />';
      })
      html += '<br/><br />'
    });

  }); //end connect
  setTimeout(function () {
    html = html + `
                    <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
            </div>    
            </body>
            </html>
        `;

    res.status(200).send(html);
  }, 3000);
})

expr.post('/emp3', function (req, res) {
var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-weight:normal;
                }
                </style>
            </head>
            <body topmargin="40" leftmargin="40" >
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background-color: #EBF5EE; padding:20px;border-radius:5px; box-shadow:5px 5px 10px #888888;">
                <h1 style="font-size:3rem;font-family:verdana;">Results</h1> <br /><br />
                <div style="z-index: 10;height:12px; width:80px; background-color:dodgerblue; margin-bottom: 18px; "></div>
    `;

  MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
    if (err) throw err;
    var dbo = db.db("mydb");
    if (req.body.status === "interviewed") {
      var query12 = { "interviewed": true }; // or false
      dbo.collection("test").find(query12).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' applicants have been \"' + req.body.status + '\".<br /><br />';
        //console.log(html);
      });
      dbo.collection("test").find(query12).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    }
    else if (req.body.status === "hired") {
      var query12 = { "hired": true }; // or false
      dbo.collection("test").find(query12).count(function (err, result) {
        if (err) throw err;
        //console.log(result);
        html += result + ' applicants have been \"' + req.body.status + '\".<br /><br />';
        //console.log(html);
      });
      dbo.collection("test").find(query12).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    }
    else if (req.body.status === "offered") {
      var query12 = { "offered": true }; // or false
      dbo.collection("test").find(query12).count(function (err, result) {
        if (err) throw err;
        html += result + ' applicants have been "offered" this job.<br /><br />';
      });
      dbo.collection("test").find(query12).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    }
    else if (req.body.status === "otherOffer") {
      var query12 = { "otherOffer": true }; // or false
      dbo.collection("test").find(query12).count(function (err, result) {
        if (err) throw err;
        html += result + ' applicants have another offer.<br /><br />';
      });
      dbo.collection("test").find(query12).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += ' Displaying top 5 (or fewer) results: <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    }
  }); //end connect
  setTimeout(function () {
    html = html + `
                    <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
              </div>  
              </body>
            </html>
        `;

    res.status(200).send(html);
  }, 3000);
})

expr.post('/emp4', function (req, res) {
  if (req.body.psn == null || req.body.psn === "") {
    res.redirect("localhost:3000/employer");
    return;
  }
  var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-weight:normal;
                }
                </style>
            </head>
            <body topmargin="40" leftmargin="40" >
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background-color: #EBF5EE; padding:20px;border-radius:5px; box-shadow:5px 5px 10px #888888;">
                <h1 style="font-size:3rem;font-family:verdana;">Results</h1> <br /><br />
                <div style="z-index: 10;height:12px; width:80px; background-color:dodgerblue; margin-bottom: 18px; "></div>
    `;

  MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
    if (err) throw err;
    var dbo = db.db("mydb");
    var query16 = { "position.job_title": { $regex: req.body.psn, $options: "i" } };
    dbo.collection("test").find(query16).count(function (err, result) {
      if (err) throw err;
      //console.log(result);
      html += result + ' applicants have applied for \"' + req.body.psn + '\".<br /><br />';
      //console.log(html);
    });
    dbo.collection("test").find(query16).limit(5).toArray(function (err, result) {
      if (err) throw err;
      html += ' Displaying top 5 (or fewer) results: <br />';
      result.forEach(function (doc) {
        html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
      })
    });
  }); //end connect
  setTimeout(function () {
    html = html + `
                    <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
              </div>
              </body>
            </html>
        `;

    res.status(200).send(html);
  }, 3000);
})

expr.post('/emp5', function (req, res) {
  if (req.body.stu == null || req.body.stu === "") {
    res.redirect("localhost:3000/employer");
    return;
  }
var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-weight:normal;
                }
                </style>
            </head>
            <body topmargin="40" leftmargin="40" >
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background-color: #EBF5EE; padding:20px;border-radius:5px; box-shadow:5px 5px 10px #888888;">
                <h1 style="font-size:3rem;font-family:verdana;">Results</h1> <br /><br />
                <div style="z-index: 10;height:12px; width:80px; background-color:dodgerblue; margin-bottom: 18px; "></div>
    `;

  MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
    if (err) throw err;
    var dbo = db.db("mydb");
    var query17 = { "name": { $regex: req.body.stu, $options: "i" } };
    //console.log(req.body.stu)
    var update;
    if (req.body.sts == "interviewed") {
      update = { $set: { "interviewed": ( (req.body.statusValue === "true") ? true: false ) } };
    }
    else if (req.body.sts == "hired") {
      update = { $set: { "hired": ( (req.body.statusValue === "true") ? true: false ) } };
    }
    else if (req.body.sts == "offered") {
      update = { $set: { "offered": ( (req.body.statusValue === "true") ? true: false ) } };
    }
    else if (req.body.sts == "otherOffer") {
      update = { $set: { "otherOffer": ( (req.body.statusValue === "true") ? true: false ) } };
    }

    dbo.collection("test").updateMany(query17, update, function (err, result) {
      if (err) throw err;
      //console.log(result);
      html += result.matchedCount + ' applicants are named \"' + req.body.stu + '\".' +
        '&nbsp;&nbsp;Update \"' + req.body.sts + '\" to ' + req.body.statusValue + ':&nbsp;' + result.modifiedCount +
        ' resumes have been updated. <br /><br />';
    });
  }); //end connect

  setTimeout(function () {
    html = html + `
                    <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
              </div>
              </body>
            </html>
        `;

    res.status(200).send(html);
  }, 3000);
})

expr.post('/emp6', function (req, res) {
var html = `
        <html>
            <head>
                <script type="text/javascript">
                </script>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-weight:normal;
                }
                </style>
            </head>
            <body topmargin="40" leftmargin="40" >
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;background-color: #EBF5EE; padding:20px;border-radius:5px; box-shadow:5px 5px 10px #888888;">
                <h1 style="font-size:3rem;font-family:verdana;">Results</h1> <br /><br />
                <div style="z-index: 10;height:12px; width:80px; background-color:dodgerblue; margin-bottom: 18px; "></div>
    `;
  
  if (req.body.profileValue === "overall") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("test").aggregate([
        {
          "$group": {
            _id: {
              _id: "$_id", name: "$name", email: "$email", summary: "$summary", experience: "$experience", projects: "$projects",
              languages: "$languages", education: "$education", hired: "$hired", interviewed: "$interviewed",
              offered: "$offered", otherOffer: "$otherOffer", position: "$position", profile: "$profile"
            },
            score: {
              $sum: {
                $add: ["$profile.hardworking",
                  "$profile.experience",
                  "$profile.intelligence",
                  "$profile.leadership",
                  "$profile.organization"]
              }
            }
          },
        },
        {
          "$sort": {
            "score": -1, name: 1
          }
        }
      ]).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += 'The top 5 (or fewer) applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            if (key === '_id') {
              html += "name: " + doc[key].name + '<br />';
              html += "email: " + doc[key].email + '<br />';
              if (doc[key].summary)
                html += "summary: " + doc[key].summary + '<br />';
              if (doc[key].experience)
                html += "experience: " + doc[key].experience + '<br />';
              if (doc[key].projects)
                html += "otherOffer: " + doc[key].projects + '<br />';
              if (doc[key].languages)
                html += "languages: " + doc[key].languages + '<br />';
              if (doc[key].education)
                html += "education: " + doc[key].education + '<br />';
              if (doc[key].hired)
                html += "hired: " + doc[key].hired + '<br />';
              if (doc[key].interviewed)
                html += "interviewed: " + doc[key].interviewed + '<br />';
              if (doc[key].offered)
                html += "offered: " + doc[key].offered + '<br />';
              if (doc[key].otherOffer)
                html += "otherOffer: " + doc[key].otherOffer + '<br />';
              if (doc[key].position)
                html += "position: " + doc[key].position + '<br />';
              if (doc[key].summary)
                html += "profile: " + JSON.stringify(doc[key].profile) + '<br />';
            }
            else {
              html += key + ": " + doc[key] + '<br />';
            }
          }
          html += '<br />';
        })
        html += '<br/>';
      });
    }); //end connect
    setTimeout(function () {
      html = html + `
                        <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
                  </div>
                  </body>
                </html>
            `;

      res.status(200).send(html);
    }, 3000);
  }
  else if (req.body.profileValue === "hardworking") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      //var query21 = { projection: { _id: 0, name: 1, "profile.hardworking": 1 } };
      var sort21 = { "profile.hardworking": -1 };
      dbo.collection("test").find({}).sort(sort21).limit(5).toArray(function (err, result) {
        if (err) throw err;

        html += 'The top 5 (or fewer) applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
      //db.close();
    }); //end connect

    setTimeout(function () {
      html = html + `
                        <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
                  </div>
                  </body>
                </html>
            `;

      res.status(200).send(html);
    }, 3000);
  }
  else if (req.body.profileValue === "experience") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      //var query22 = { projection: { _id: 0, name: 1, "profile.experience": 1 } };
      var sort22 = { "profile.experience": -1 };
      dbo.collection("test").find({}).sort(sort22).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += 'The top 5 (or fewer) applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });
    setTimeout(function () {
      html = html + `
                        <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
                    </div>
                    </body>
                </html>
            `;

      res.status(200).send(html);
    }, 3000);
  }
  else if (req.body.profileValue === "intelligence") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      //var query22 = { projection: { _id: 0, name: 1, "profile.experience": 1 } };
      var sort23 = { "profile.intelligence": -1 };
      dbo.collection("test").find({}).sort(sort23).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += 'The top 5 (or fewer) applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });
    setTimeout(function () {
      html = html + `
                        <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
                  </div>  
                  </body>
                </html>
            `;

      res.status(200).send(html);
    }, 3000);
  }
  else if (req.body.profileValue === "leadership") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      //var query22 = { projection: { _id: 0, name: 1, "profile.experience": 1 } };
      var sort24 = { "profile.leadership": -1 };
      dbo.collection("test").find({}).sort(sort24).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += 'The top 5 (or fewer) applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });
    setTimeout(function () {
      html = html + `
                        <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
                  </div>
                  </body>
                </html>
            `;

      res.status(200).send(html);
    }, 3000);
  }
  else if (req.body.profileValue === "organization") {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      //var query22 = { projection: { _id: 0, name: 1, "profile.experience": 1 } };
      var sort25 = { "profile.organization": -1 };
      dbo.collection("test").find({}).sort(sort25).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += 'The top 5 (or fewer) applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          html += '<table style="max-width:80%;font-size:1rem;font-family:verdana;font-weight: normal;">';
          for (var key in doc) { 
            if (key === 'profile' || key === "position" ) {
              html += "<tr><th>" + key + "</th><th>" + JSON.stringify(doc[key]) + '</th></tr>';
            }
            else {
              html += "<tr><th>" + key + "</th><th>" + doc[key] + '</th></tr>';
            }
          }
          html += '</table><br /><br />';
        })
      });
    });
    setTimeout(function () {
      html = html + `
                        <a style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;align-self:center;align-self:center;"  href="http://localhost:3000/employer">Return to employer page</a>
                  </div>
                  </body>
                </html>
            `;

      res.status(200).send(html);
    }, 3000);
  }
})

expr.post('/empInf', function (req, res) {
  // console.log(req.body.company);
  // console.log(req.body.email);
  // console.log(req.body.jobTitle);
  //update employer database
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    //insert myobj if its not already there.
    var jobListing = { employer: req.body.company, email: req.body.email, job_title: req.body.jobTitle };

    dbo.collection("employers").findOne(jobListing, function (err, result) {
      if (err) throw err;
      if (result == null) {
        dbo.collection("employers").insertOne(jobListing, function (err, res) {
          if (err) throw err;
          //console.log(jobListing.job_title + " at " + jobListing.employer + " inserted!");
        });
      }
    });
  });

  setTimeout(function () {
    // send confirmation email
    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "lucentats@gmail.com",
        pass: "#############"
      }
    });

    var email = {
      from: "lucentats@gmail.com",
      to: req.body.email, // employer email
      // Instead of applicant.email we can use:
      // JSON.stringify(result).slice(10, len), which takes the email from the database
      subject: 'Job Listing Creation Confirmation Email',
      text: 'Dear ' + req.body.company + ', \n\nYour ' +
        req.body.jobTitle + ' job listing has been created. ' +
        '\n\nPlease do not reply to this email.'
    };

    transport.sendMail(email, function (err, info) {
      if (err) throw err;
      if (info.response.slice(0, 3) == "250") { // add 550
        let data = JSON.stringify(email);
        fs.writeFileSync('sentJobCfm.json', data);
        console.log('Job listing creation confirmation has been sent. ' + info.response);
      } else {
        console.log('Job listing creation confirmation was not sent. ' + info.response);
      }
    });
    res.redirect("http://localhost:3000/joblistingconfirmation"); //create a Confirmation page.
  }, 3000);
})

expr.post('/test2', function (req, res) {
  try {
    if (!req.files) {
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
    }
  } catch (err) {
    res.status(500).send(err);
  }

  setTimeout(function(){ 
    app.main();
  }, 500);

  setTimeout(function () {
    var fileName = 'compiled/' + req.files.resume2.name.split('.').slice(0, -1).join('.') + ".json";
    let rawdata = fs.readFileSync(fileName);
    let applicant = JSON.parse(rawdata);

    var html = `
                 <html>
                        <head>
                            <script type="text/javascript">
                            </script>
  
                        </head>
                        <body topmargin="40" leftmargin="40" style="display:flex; justify-content:center;align-items:center;">
                        <div style="box-shadow: 5px 5px 10px #888888; margin-top: auto; margin-bottom: auto; background-color:#EBF5EE;height:85vh; width: 60vw; display:flex;flex-direction:column;align-items:center;align-self:center;justify-self:center;padding-bottom:30px;padding-top:20px;overflow:scroll;">
                        <h1 style="font-size:3rem;font-family:verdana;">Applicant Dashboard</h1>
        `;
    //html = html + JSON.stringify(result);
    html = html +
      `
        <form action="http://localhost:3001/testCfm" method="POST">
          <label style="color:gray;font-size: 1.5rem;" for="name">Name:</label></br>
          <textarea id="name" name="name" rows="2" cols="50">` + (applicant.name ? applicant.name : "") + `</textarea><br><br>
          <label style="color:gray;font-size: 1.5rem;" for="email">Email:</label></br>
          <textarea id="email" name="email" rows="2" cols="50">` + (applicant.email ? applicant.email : "") + `</textarea><br><br>`;
    if (applicant.objective) {
      html = html + `
             <label style="color:gray;font-size: 1.5rem;" for="objective">Objective:</label></br>
                         <textarea id="objective" name="objective" rows="4" cols="50">
                         ` + (applicant.objective ? applicant.objective : "") + `
                         </textarea>
                        <br><br>`;
    }
    if (applicant.summary) {
      html = html + `
               <label style="color:gray;font-size: 1.5rem;" for="summary">Summary:</label></br>
                           <textarea id="summary" name="summary" rows="4" cols="50">
                           ` + (applicant.summary ? applicant.summary : "") + `
                           </textarea>
                       <br><br>`;

    }
    if (applicant.technology) {
      html = html + `
            <label style="color:gray;font-size: 1.5rem;" for="technology">Technology:</label></br>
                          <textarea id="technology" name="technology" rows="4" cols="50">
                          ` + (applicant.technology ? applicant.name : "") + `
                          </textarea>
                    <br><br>
            `;
    }
    if (applicant.skills) {
      html = html + `
           <label style="color:gray;font-size: 1.5rem;" for="skills">Skills:</label></br>
                 <textarea id="skills" name="skills" rows="4" cols="50">
                 ` + (applicant.skills ? applicant.skills : "") + `
                 </textarea>
         <br><br>`;
    }
    if (applicant.experience) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="experience">Experience:</label></br>
              <textarea id="experience" name="experience" rows="4" cols="50">
              ` + (applicant.experience ? applicant.experience : "") + `
              </textarea>
              <br><br>`;
    }
    if (applicant.education) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="education">Education:</label></br>
                <textarea id="education" name="education" rows="4" cols="50">
                ` + (applicant.education ? applicant.education : "") + `
                </textarea>
                <br><br> `;
    }
    if (applicant.languages) {
      html = html + `
                <label style="color:gray;font-size: 1.5rem;" for="languages">Languages:</label></br>
                      <textarea id="languages" name="languages" rows="4" cols="50">
                          ` + (applicant.languages ? applicant.languages : "") + `
                      </textarea><br><br>
            `;
    }

    if (applicant.positions) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="positions">Positions:</label></br>
            <textarea id="positions" name="positions" rows="4" cols="50">
                ` + (applicant.positions ? applicant.positions : "") + `
            </textarea><br><br>`;
    }
    if (applicant.awards) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="awards">Awards:</label></br>
            <textarea id="awards" name="awards" rows="4" cols="50">
                ` + (applicant.awards ? applicant.awards : "") + `
            </textarea><br><br>`;
    }
    if (applicant.certification) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="certification">Certifications:</label></br>
            <textarea id="certification" name="certification" rows="4" cols="50">
                ` + (applicant.certification ? applicant.certification : "") + `
            </textarea><br><br>`;
    }
    if (applicant.contacts) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="contacts">Contacts:</label></br>
            <textarea id="contacts" name="contacts" rows="4" cols="50">
                ` + (applicant.contacts ? applicant.contacts : "") + `
            </textarea><br><br>`;
    }
    if (applicant.courses) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="courses">courses:</label></br>
            <textarea id="courses" name="courses" rows="4" cols="50">
                ` + (applicant.courses ? applicant.courses : "") + `
            </textarea><br><br>`;
    }
    if (applicant.honors) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="honors">honors:</label></br>
            <textarea id="honors" name="honors" rows="4" cols="50">
                ` + (applicant.honors ? applicant.honors : "") + `
            </textarea><br><br>`;
    }
    if (applicant.interests) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="interests">Contacts:</label></br>
            <textarea id="interests" name="interests" rows="4" cols="50">
                ` + (applicant.interests ? applicant.interests : "") + `
            </textarea><br><br>`;
    }

    html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="jobTitle">Job Title:</label></br>`;


    setTimeout(function () {
      MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("employers").find().toArray(function (err, result) {
          if (err) throw err;
          html = html + `
             <select name="position" id="position">`;
          result.forEach(function (doc) {
            html = html + '<option value=\"' + JSON.stringify(doc).replace(/["']/g, "") + '\">' + doc["employer"] + " - " + doc["job_title"] + '</option>';
          })
          html = html + "</select>";
        }) //end find
      }); //end connect
    }, 1000);

    setTimeout(function () {
      html = html + `
          <input style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;" type="submit" value="Submit">
        </form>
        <a href="http://localhost:3000/apply">Return to the applicant apply page.</a>
        </div>
        </body>
        </html>
        `;
      res.status(200).send(html);
    }, 3000);
  }, 4000);
});

expr.post('/test', function (req, res) {
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

  setTimeout(function () {
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
                        </head>
                        <body topmargin="40" leftmargin="40" style="display:flex; justify-content:center;align-items:center;">
                        <div style="box-shadow: 5px 5px 10px #888888; margin-top: auto; margin-bottom: auto; background-color:#EBF5EE;height:85vh; width: 60vw; display:flex;flex-direction:column;align-items:center;align-self:center;justify-self:center;padding-bottom:30px;padding-top:20px;overflow:scroll;">
                        <h1 style="font-size:3rem;font-family:verdana;">Applicant Dashboard</h1>
        `;
    //html = html + JSON.stringify(result);
    html = html +
      `
        <form action="http://localhost:3001/testCfm" method="POST">
          <label style="color:gray;font-size: 1.5rem;" for="name">Name:</label></br>
          <textarea id="name" name="name" rows="2" cols="50">` + (applicant.name ? applicant.name : "") + `</textarea><br><br>
          <label style="color:gray;font-size: 1.5rem;" for="email">Email:</label></br>
          <textarea id="email" name="email" rows="2" cols="50">` + (applicant.email ? applicant.email : "") + `</textarea><br><br>`;
    if (applicant.objective) {
      html = html + `
             <label style="color:gray;font-size: 1.5rem;" for="objective">Objective:</label></br>
                         <textarea id="objective" name="objective" rows="4" cols="50">
                         ` + (applicant.objective ? applicant.objective : "") + `
                         </textarea>
                        <br><br>`;
    }
    if (applicant.summary) {
      html = html + `
               <label style="color:gray;font-size: 1.5rem;" for="summary">Summary:</label></br>
                           <textarea id="summary" name="summary" rows="4" cols="50">
                           ` + (applicant.summary ? applicant.summary : "") + `
                           </textarea>
                       <br><br>`;

    }
    if (applicant.technology) {
      html = html + `
            <label style="color:gray;font-size: 1.5rem;" for="technology">Technology:</label></br>
                          <textarea id="technology" name="technology" rows="4" cols="50">
                          ` + (applicant.technology ? applicant.name : "") + `
                          </textarea>
                    <br><br>
            `;
    }
    if (applicant.skills) {
      html = html + `
           <label style="color:gray;font-size: 1.5rem;" for="skills">Skills:</label></br>
                 <textarea id="skills" name="skills" rows="4" cols="50">
                 ` + (applicant.skills ? applicant.skills : "") + `
                 </textarea>
         <br><br>`;
    }
    if (applicant.experience) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="experience">Experience:</label></br>
              <textarea id="experience" name="experience" rows="4" cols="50">
              ` + (applicant.experience ? applicant.experience : "") + `
              </textarea>
              <br><br>`;
    }
    if (applicant.education) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="education">Education:</label></br>
                <textarea id="education" name="education" rows="4" cols="50">
                ` + (applicant.education ? applicant.education : "") + `
                </textarea>
                <br><br> `;
    }
    if (applicant.languages) {
      html = html + `
                <label style="color:gray;font-size: 1.5rem;" for="languages">Languages:</label></br>
                      <textarea id="languages" name="languages" rows="4" cols="50">
                          ` + (applicant.languages ? applicant.languages : "") + `
                      </textarea><br><br>
            `;
    }

    if (applicant.positions) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="positions">Positions:</label></br>
            <textarea id="positions" name="positions" rows="4" cols="50">
                ` + (applicant.positions ? applicant.positions : "") + `
            </textarea><br><br>`;
    }
    if (applicant.awards) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="awards">Awards:</label></br>
            <textarea id="awards" name="awards" rows="4" cols="50">
                ` + (applicant.awards ? applicant.awards : "") + `
            </textarea><br><br>`;
    }
    if (applicant.certification) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="certification">Certifications:</label></br>
            <textarea id="certification" name="certification" rows="4" cols="50">
                ` + (applicant.certification ? applicant.certification : "") + `
            </textarea><br><br>`;
    }
    if (applicant.contacts) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="contacts">Contacts:</label></br>
            <textarea id="contacts" name="contacts" rows="4" cols="50">
                ` + (applicant.contacts ? applicant.contacts : "") + `
            </textarea><br><br>`;
    }
    if (applicant.courses) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="courses">courses:</label></br>
            <textarea id="courses" name="courses" rows="4" cols="50">
                ` + (applicant.courses ? applicant.courses : "") + `
            </textarea><br><br>`;
    }
    if (applicant.honors) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="honors">honors:</label></br>
            <textarea id="honors" name="honors" rows="4" cols="50">
                ` + (applicant.honors ? applicant.honors : "") + `
            </textarea><br><br>`;
    }
    if (applicant.interests) {
      html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="interests">Contacts:</label></br>
            <textarea id="interests" name="interests" rows="4" cols="50">
                ` + (applicant.interests ? applicant.interests : "") + `
            </textarea><br><br>`;
    }

    html = html + `
          <label style="color:gray;font-size: 1.5rem;" for="jobTitle">Job Title:</label></br>`;


    setTimeout(function () {
      MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("employers").find().toArray(function (err, result) {
          if (err) throw err;
          html = html + `
             <select name="position" id="position">`;
          result.forEach(function (doc) {
            html = html + '<option value=\"' + JSON.stringify(doc).replace(/["']/g, "") + '\">' + doc["employer"] + " - " + doc["job_title"] + '</option>';
          })
          html = html + "</select>";
        }) //end find
      }); //end connect
    }, 1000);

    setTimeout(function () {
      html = html + `
          <input style="padding:20px;border-radius:11px;border:solid 3px rgb(102, 178, 240);background-color:#EBF5EE;margin-left:15px;color:#009FFD;cursor:pointer;" type="submit" value="Submit">
        </form>
        <a href="http://localhost:3000/apply">Return to the applicant apply page.</a>
        </div>
        </body>
        </html>
        `;
      res.status(200).send(html);
    }, 3000);
  }, 4000);
})

expr.post('/testCfm', function (req, res) {
  var resm = req.body;
  if (resm.position){
    resm.position = resm.position.replace('{', '{\"').replace(/:/g, '\":\"').replace(/,/g, '\",\"').replace('}', '\"}');
    resm.position = JSON.parse(resm.position);
  }

  //console.log(resm);

  var posEmp;
  setTimeout(function () {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");

      dbo.collection("test").findOne({ name: resm.name, email: resm.email }, function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (result == null) {
          dbo.collection("test").insertOne(resm, function (err, res) {
            if (err) throw err;
            var newValues = { $set: { hired: false, offered: false, interviewed: false, otherOffer: false } };
            //console.log(resm);
            dbo.collection("test").updateOne({ _id: resm._id }, newValues, function (err, res) {
              if (err) throw err;
              //db.close();
            });
            console.log("1 document inserted");
          });
        }
        else {
          dbo.collection("test").updateMany({ name: resm.name,  email: resm.email }, { $set: resm }, function (err, result) {
            if (err) throw err;
            //db.close();
            console.log("Updated document(s)");
          });
        }
      });

      var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "lucentats@gmail.com",
          pass: "aA123456789!"
        }
      });
    
      var email = { // sending email to applicant
        from: transport.user,
        to: resm.email, // applicant.email
        subject: 'Application Confirmation Email',
        text: 'Dear ' + resm.name + ', \n\nYour application for the ' +
          resm.position.job_title + ' job listing at ' + resm.position.employer + ' has been submitted. ' + 
          'We appreciate your interest in our team!\n\nIf you are selected for a follow-up interview, a representative will contact you for further information.\n\nThanks, \n' + resm.position.employer +
          '\n\nPlease do not reply to this email.'
      };

      var email2 = { // sending email to lucent
        from: transport.user,
        to: resm.position.email, // applicant.email
        subject: resm.position.job_title + ' Job Listing Application Received',
        text: 'Dear ' + resm.position.employer + ', \n\n' +
          resm.name + ' has applied to your ' + resm.position.job_title + ' job listing.' + '\n\nThanks, \nLucent ATS' +
          '\n\nPlease do not reply to this email.'
      };
    
      transport.sendMail(email, function (err, info) {
        if (err) throw err;
        if (info.response.slice(0, 3) == "250") { // add 550
          let data = JSON.stringify(email);
          fs.writeFileSync('sentAppCfm.json', data);
          console.log('Applicant email confirmation has been sent. ' + info.response);
        } else {
          console.log('Applicant email confirmation was not sent. ' + info.response);
        }
      });

      transport.sendMail(email2, function (err, info) {
        if (err) throw err;
        if (info.response.slice(0, 3) == "250") { // add 550
          let data = JSON.stringify(email);
          fs.writeFileSync('sentAppCfm.json', data);
          console.log('Applicant email confirmation has been sent. ' + info.response);
        } else {
          console.log('Applicant email confirmation was not sent. ' + info.response);
        }
      });
      //var html = `<p>You submitted a resume</p>`
      //res.status(200).send(html);

      res.redirect('http://localhost:3000/confirmation');
      //setTimeout(function () { db.close(); }, 3000);
    })
  }, 3000);


})

expr.listen(3001, function () {
  console.log('App is running on 3001');
})