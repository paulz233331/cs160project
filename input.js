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
var url = "mongodb://54.205.24.189:27017/mydb"// "mongodb://appt:appt@127.17.0.1:27017/mydb?authSource=admin"


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
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          //var tmp = JSON.stringify(doc);
          for (var key in doc) {
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
              dbo.collection("test").find(query9b).limit(5).toArray(function (err, result) {
                if (err) throw err;
                expect(result[0].name).toEqual('Prem Prakash');
                expect(result[0].email).toEqual('premgautam958@gmail.com');
              });
              db.close();
            }); //end connect*/
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
      });
    });//end connect*/
  }

  setTimeout(function () {
    html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
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
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;

  MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
    if (err) throw err;
    var dbo = db.db("mydb");

    var query11a = { projection: { _id: 0, "name": 1 } };
    dbo.collection("test").find({}, query11a).toArray(function (err, result) {
      if (err) throw err;
      html += ' Displaying list of names: ';
      result.forEach(function (doc) {
        for (var key in doc) {
          html += doc[key] + ', ';
        }
      })
      html += '<br/><br />'
    });

    var query11b = { projection: { _id: 0, "email": 1 } };
    dbo.collection("test").find({}, query11b).toArray(function (err, result) {
      if (err) throw err;
      html += ' Displaying list of emails: ';
      result.forEach(function (doc) {
        for (var key in doc) {
          html += doc[key] + ', ';
        }
      })
      html += '<br/><br />'
    });

  }); //end connect
  setTimeout(function () {
    html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
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
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
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
        html += ' Displaying top 5 results: <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            html += key + ": " + doc[key] + '<br />';
          }
          html += '<br />';
        })
        html += '<br/>'
      });
    }
  }); //end connect
  setTimeout(function () {
    html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
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
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
    `;

  MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
    if (err) throw err;
    var dbo = db.db("mydb");
    var query16 = { "position.job_title": req.body.psn };
    dbo.collection("test").find(query16).count(function (err, result) {
      if (err) throw err;
      //console.log(result);
      html += result + ' applicants have applied for \"' + req.body.psn + '\".<br /><br />';
      //console.log(html);
    });
    dbo.collection("test").find(query16).limit(5).toArray(function (err, result) {
      if (err) throw err;
      html += ' Displaying top 5 results: <br />';
      result.forEach(function (doc) {
        for (var key in doc) {
          html += key + ": " + doc[key] + '<br />';
        }
        html += '<br />';
      })
      html += '<br/>'
    });
  }); //end connect
  setTimeout(function () {
    html = html + `
                    <a href="http://localhost:3000/employer">Return to employer page</a>
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
                    <a href="http://localhost:3000/employer">Return to employer page</a>
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
            </head>
            <body topmargin="40" leftmargin="40">
                Results: <br /><br />
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
        html += 'The top 5 applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
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
                        <a href="http://localhost:3000/employer">Return to employer page</a>
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

        html += 'The top 5 applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            if (key === 'profile') {
              html += key + ": " + JSON.stringify(doc[key]) + '<br />';
            }
            else {
              html += key + ": " + doc[key] + '<br />';
            }
          }
          html += '<br />';
        })
        html += '<br/>'
      });
      //db.close();
    }); //end connect

    setTimeout(function () {
      html = html + `
                        <a href="http://localhost:3000/employer">Return to employer page</a>
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
        html += 'The top 5 applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            if (key === 'profile') {
              html += key + ": " + JSON.stringify(doc[key]) + '<br />';
            }
            else {
              html += key + ": " + doc[key] + '<br />';
            }
          }
          html += '<br />';
        })
        html += '<br/>'
      });
    });
    setTimeout(function () {
      html = html + `
                        <a href="http://localhost:3000/employer">Return to employer page</a>
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
        html += 'The top 5 applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            if (key === 'profile') {
              html += key + ": " + JSON.stringify(doc[key]) + '<br />';
            }
            else {
              html += key + ": " + doc[key] + '<br />';
            }
          }
          html += '<br />';
        })
        html += '<br/>'
      });
    });
    setTimeout(function () {
      html = html + `
                        <a href="http://localhost:3000/employer">Return to employer page</a>
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
        html += 'The top 5 applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            if (key === 'profile') {
              html += key + ": " + JSON.stringify(doc[key]) + '<br />';
            }
            else {
              html += key + ": " + doc[key] + '<br />';
            }
          }
          html += '<br />';
        })
        html += '<br/>'
      });
    });
    setTimeout(function () {
      html = html + `
                        <a href="http://localhost:3000/employer">Return to employer page</a>
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
      dbo.collection("test").find({}).sort(sort24).limit(5).toArray(function (err, result) {
        if (err) throw err;
        html += 'The top 5 applicants with highest scores for \"' + req.body.profileValue + '\".<br /><br />' +
          'Results: <br /> <br />';
        result.forEach(function (doc) {
          for (var key in doc) {
            if (key === 'profile') {
              html += key + ": " + JSON.stringify(doc[key]) + '<br />';
            }
            else {
              html += key + ": " + doc[key] + '<br />';
            }
          }
          html += '<br />';
        })
        html += '<br/>'
      });
    });
    setTimeout(function () {
      html = html + `
                        <a href="http://localhost:3000/employer">Return to employer page</a>
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
        pass: "aA123456789!"
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
  setTimeout(function () {
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
                                You are redirected here after uploading a resume.
            `;
    //html = html + JSON.stringify(result);
    html = html +
      `
            <form action="http://localhost:3001/testCfm" method="POST">
              <label for="name">Name:</label>
              <textarea id="name" name="name" rows="2" cols="50">` + (applicant.name ? applicant.name : "") + `</textarea><br><br>
              <label for="email">Email:</label>
              <textarea id="email" name="email" rows="2" cols="50">` + (applicant.email ? applicant.email : "") + `</textarea><br><br>`;
    if (applicant.objective) {
      html = html + `
                 <label for="objective">Objective:</label>
                             <textarea id="objective" name="objective" rows="4" cols="50">
                             ` + (applicant.objective ? applicant.objective : "") + `
                             </textarea>
                            <br><br>`;
    }
    if (applicant.summary) {
      html = html + `
                   <label for="summary">Summary:</label>
                               <textarea id="summary" name="summary" rows="4" cols="50">
                               ` + (applicant.summary ? applicant.summary : "") + `
                               </textarea>
                           <br><br>`;

    }
    if (applicant.technology) {
      html = html + `
                <label for="technology">Technology:</label>
                              <textarea id="technology" name="technology" rows="4" cols="50">
                              ` + (applicant.technology ? applicant.name : "") + `
                              </textarea>
                        <br><br>
                `;
    }
    if (applicant.skills) {
      html = html + `
               <label for="skills">Skills:</label>
                     <textarea id="skills" name="skills" rows="4" cols="50">
                     ` + (applicant.skills ? applicant.skills : "") + `
                     </textarea>
             <br><br>`;
    }
    if (applicant.experience) {
      html = html + `
              <label for="experience">Experience:</label>
                  <textarea id="experience" name="experience" rows="4" cols="50">
                  ` + (applicant.experience ? applicant.experience : "") + `
                  </textarea>
                  <br><br>`;
    }
    if (applicant.education) {
      html = html + `
              <label for="education">Education:</label>
                    <textarea id="education" name="education" rows="4" cols="50">
                    ` + (applicant.education ? applicant.education : "") + `
                    </textarea>
                    <br><br> `;
    }
    if (applicant.languages) {
      html = html + `
                    <label for="languages">Languages:</label>
                          <textarea id="languages" name="languages" rows="4" cols="50">
                              ` + (applicant.languages ? applicant.languages : "") + `
                          </textarea><br><br>
                `;
    }
    if (applicant.positions) {
      html = html + `
              <label for="positions">Languages:</label>
                <textarea id="positions" name="positions" rows="4" cols="50">
                    ` + (applicant.positions ? applicant.positions : "") + `
                </textarea><br><br>`;
    }
    html = html + `
          <label for="jobTitle">Job Title:</label>`;

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("employers").find().toArray(function (err, result) {
        if (err) throw err;
        html = html + '<select name="position" id="position">';
        result.forEach(function (doc) {
          html = html + '<option value=\"' + JSON.stringify(doc).replace(/["']/g, "") + '\">' + doc["employer"] + " - " + doc["job_title"] + '</option>';
        })
        html = html + "</select>";
      }) //end find
    }); //end connect


    setTimeout(function () {
      html = html + `
              <input type="submit" value="Submit">
            </form>
        <a href="http://localhost:3000/apply">Return to the applicant apply page.</a>
            </body>
            </html>
            `;
      res.status(200).send(html);
    }, 3000);

  }, 3000);

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
    if (applicant.objective) {
      html = html + `
             <label for="objective">Objective:</label>
                         <textarea id="objective" name="objective" rows="4" cols="50">
                         ` + (applicant.objective ? applicant.objective : "") + `
                         </textarea>
                        <br><br>`;
    }
    if (applicant.summary) {
      html = html + `
               <label for="summary">Summary:</label>
                           <textarea id="summary" name="summary" rows="4" cols="50">
                           ` + (applicant.summary ? applicant.summary : "") + `
                           </textarea>
                       <br><br>`;

    }
    if (applicant.technology) {
      html = html + `
            <label for="technology">Technology:</label>
                          <textarea id="technology" name="technology" rows="4" cols="50">
                          ` + (applicant.technology ? applicant.name : "") + `
                          </textarea>
                    <br><br>
            `;
    }
    if (applicant.skills) {
      html = html + `
           <label for="skills">Skills:</label>
                 <textarea id="skills" name="skills" rows="4" cols="50">
                 ` + (applicant.skills ? applicant.skills : "") + `
                 </textarea>
         <br><br>`;
    }
    if (applicant.experience) {
      html = html + `
          <label for="experience">Experience:</label>
              <textarea id="experience" name="experience" rows="4" cols="50">
              ` + (applicant.experience ? applicant.experience : "") + `
              </textarea>
              <br><br>`;
    }
    if (applicant.education) {
      html = html + `
          <label for="education">Education:</label>
                <textarea id="education" name="education" rows="4" cols="50">
                ` + (applicant.education ? applicant.education : "") + `
                </textarea>
                <br><br> `;
    }
    if (applicant.languages) {
      html = html + `
                <label for="languages">Languages:</label>
                      <textarea id="languages" name="languages" rows="4" cols="50">
                          ` + (applicant.languages ? applicant.languages : "") + `
                      </textarea><br><br>
            `;
    }
    if (applicant.positions) {
      html = html + `
          <label for="positions">Languages:</label>
            <textarea id="positions" name="positions" rows="4" cols="50">
                ` + (applicant.positions ? applicant.positions : "") + `
            </textarea><br><br>`;
    }
    html = html + `
          <label for="jobTitle">Job Title:</label>`;


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
          <input type="submit" value="Submit">
        </form>
        <a href="http://localhost:3000/apply">Return to the applicant apply page.</a>
        </body>
        </html>
        `;
      res.status(200).send(html);
    }, 3000);
  }, 3000);

})

//https://stackoverflow.com/questions/29020931/add-quotation-marks-to-json-object-attributes
function JSONify(obj) {
  var o = {};
  for (var i in obj) {
    o['"' + i + '"'] = obj[i]; // make the quotes
  }
  return o;
}

expr.post('/testCfm', function (req, res) {
  var resm = req.body;
  resm.position = resm.position.replace('{', '{\"').replace(/:/g, '\":\"').replace(/,/g, '\",\"').replace('}', '\"}');
  resm.position = JSON.parse(resm.position);
  var posEmp;
  setTimeout(function () {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("test").findOne({ name: resm.name, email: resm.email }, function (err, result) {
        if (err) throw err;
        if (result == null) {
          dbo.collection("test").insertOne(resm, function (err, res) {
            if (err) throw err;
            var newValues = { $set: { hired: false, offered: false, interviewed: false, otherOffer: false } };
            console.log(resm);
            dbo.collection("test").updateOne({ _id: resm._id }, newValues, function (err, res) {
              if (err) throw err;
            });
            console.log("1 document inserted");

          });
        }
        else {
          dbo.collection("test").updateMany(result, { $set: resm }, function (err, result) {
            if (err) throw err;
            console.log("Updated document(s)");

          });
        }
      });

      //var html = `<p>You submitted a resume</p>`
      //res.status(200).send(html);
      var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "lucentats@gmail.com",
          pass: "aA123456789!"
        }
      });
    
      var email = {
        from: transport.user,
        to: resm.email, // applicant.email
        // Instead of resm.email we can use:
        // JSON.stringify(result).slice(10, len), which takes the email from the database
        subject: 'Application Confirmation Email',
        text: 'Dear ' + resm.name + ', \n\nYour application for ' +
          resm.email + ' has been submitted. ' + // add result.position.employer
          'We appreciate your interest in our team!\n\nIf you are selected for a follow-up interview, a representative will contact you for further information.\n\nThanks, \n' + result.employer +
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
      res.redirect('http://localhost:3000/confirmation');
      setTimeout(function () { db.close(); }, 3000);
    })
  }, 3000);


})

expr.listen(3001, function () {
  console.log('App is running on 3001');
})