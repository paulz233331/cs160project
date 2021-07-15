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



expr.listen(3001, function() {
  console.log('App is running on 3001');
})
