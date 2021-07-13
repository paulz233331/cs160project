const { bold } = require('colors');
var mongo = require('mongodb');
jest.useFakeTimers();
var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"//"mongodb://dbApp:dbApp@54.205.24.189:27017/mydb?authSource=admin" //"mongodb://54.205.24.189:27017/mydb";

describe("Testing with Jest", () => {

        test("Query 1", () => {

            MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");

            var query1 = { "education" : { $regex : "university" , $options : "i" } };
            dbo.collection("applicants").find(query1).toArray(function(err, result) {
              if (err) throw err;
              console.log("Query 1: Search in education complete");
              //console.log(result);
              expect(result[0].name).toEqual('Alex Dubinchyk');
              expect(result[0].email).toEqual('alexs.dbk@gmail.com');
              expect(result[0].objective).toEqual('Seeking a challenging position to use my software Web development and process optimization\n' +
                                                                      'skills.');
            });
            db.close();

            }); //end connect
        }); //end test

        test("Query 11b", () => {

            MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");
                // Find all emails
                  var query11b = { projection : { _id : 0 , "email" : 1 } };
                  dbo.collection("applicants").find({}, query11b).toArray(function(err, result) {
                    if (err) throw err;
                    console.log("The emails are:\n" + JSON.stringify(result));
                    expect(result[0].email).toEqual("alexs.dbk@gmail.com");
                  });
                    db.close();

            }); //end connect
        }); //end test

        test("Query 11a", () => {

            MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");
              // Find all names
              var query11a = { projection : { _id : 0 , "name" : 1 } };
              dbo.collection("applicants").find({}, query11a).toArray(function(err, result) {
                if (err) throw err;
                console.log("The names are:\n" + JSON.stringify(result));
                expect(result[0].name).toEqual('Alex Dubinchyk');
                db.close();
              });
            }); //end connect
        }); //end test

        test("Query 12", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");
              // Find interviewed (true/false)
              var query12 = { "interviewed" : true }; // or false
              dbo.collection("applicants").find(query12).toArray(function(err, result) {
                if (err) throw err;
                console.log("Query 12: interviewed search complete");
                expect(result[0].name).toEqual("M V");
                db.close();
              });
          }); //end connect
        }); //end test

        test("Query 13", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");

              // Find hired (true/false)
              var query13 = { "hired" : true }; // or false
              dbo.collection("applicants").find(query13).toArray(function(err, result) {
                if (err) throw err;
                console.log("Query 13: hired search complete");
                expect(result[0].name).toEqual("M V");
                db.close();
              });
          }); //end connect
        }); //end test

        test("Query 14", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");
              // Find offered (true/false)
              var query14 = { "offered" : true }; // or false
              dbo.collection("applicants").find(query14).toArray(function(err, result) {
                if (err) throw err;
                console.log("Query 14: offered search complete");
                expect(result[0].name).toEqual("M V");
                db.close();
              });
          }); //end connect
        }); //end test

        test("Query 15", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");
                // Find otherOffer (true/false)
                var query15 = { "otherOffer" : true }; // or false
                dbo.collection("applicants").find(query15).toArray(function(err, result) {
                  if (err) throw err;
                  console.log("Query 15: otherOffer search complete");
                  expect(result[0].name).toEqual("M V");
                  db.close();
                });
          }); //end connect
        }); //end test

        test("Query 16", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
              if (err) throw err;
              var dbo = db.db("mydb");
              // Find by position
              var query16 = { "position" : "" };
              dbo.collection("applicants").find(query16).toArray(function(err, result) {
                if (err) throw err;
                console.log("Query 16: position search complete");
                expect(result[0].name).toEqual('Alex Dubinchyk');
                db.close();
              });
          }); //end connect
        }); //end test

        test("Query 17", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
          if (err) throw err;
          var dbo = db.db("mydb");
            // Update interviewed status (true/false)
            var query17 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
            var update = { $set : { "interviewed" : true } }; // or false
            dbo.collection("applicants").updateOne(query17, update, function(err, result) {
              if (err) throw err;
              console.log("Query 17: interviewed status has been updated");
              dbo.collection("applicants").findOne(query17, function(err, result) {
                  //console.log(result);
                  expect(result.interviewed).toBeTruthy();
                db.close();
              });
            });
          }); //end connect
        }); //end test

        test("Query 18", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
            if (err) throw err;
            var dbo = db.db("mydb");
              // Update hired status (true/false)
              var query18 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
              var update = { $set : { "hired" : true } }; // or false
              dbo.collection("applicants").updateOne(query18, update, function(err, result) {
                if (err) throw err;
                console.log("Query 18: hired status has been updated");
                dbo.collection("applicants").findOne(query18, function(err, result) {
                       //console.log(result);
                       expect(result.hired).toBeTruthy();
                      db.close();
                });
              });
          }); //end connect
        }); //end test

        test("Query 19", () => {
          MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
            if (err) throw err;
            var dbo = db.db("mydb");
            // Update offered status (true/false)
            var query19 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
            var update = { $set : { "offered" : true } }; // or false
            dbo.collection("applicants").updateOne(query19, update, function(err, result) {
              if (err) throw err;
              console.log("Query 19: offered status has been updated");
              dbo.collection("applicants").findOne(query19, function(err, result) {
                     //console.log(result);
                     expect(result.offered).toBeTruthy();
                     db.close();
              });
            });
          }); //end connect
        }); //end test


    test("Query 20", () => {
      MongoClient.connect(url, function(err, db) { //{ useUnifiedTopology: true },
        if (err) throw err;
        var dbo = db.db("mydb");
          // Update otherOffer status (true/false)
          var query20 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
          var update = { $set : { "otherOffer" : true } }; // or false
          dbo.collection("applicants").updateOne(query20, update, function(err, result) {
                if (err) throw err;
                console.log("Query 20: otherOffer status has been updated");
                dbo.collection("applicants").findOne(query20, function(err, result) {
                     //console.log(result);
                     expect(result.otherOffer).toBeTruthy();
                         db.close();
                });
          });
      }); //end connect
    }); //end test

       // setTimeout(function(){ db.close(); }, 4000);
}); //end describe
  
/*
  // Find in education (e.g. University, College)
  var query1 = { "education" : { $regex : "university" , $options : "i" } };
  dbo.collection("applicants").find(query1).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 1: Search in education complete");
    db.close();
  });

  // Find in summary (e.g. work, opportunity)
  var query2 = { "summary" : { $regex : "software" , $options : "i" } };
  dbo.collection("applicants").find(query2).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 2: Search in summary complete");
    db.close();
  });

  // Find in objective (e.g. work, software, engineer)
  var query3 = { "objective" : { $regex : "software" , $options : "i" } };
  dbo.collection("applicants").find(query3).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 3: Search in objective complete");
    db.close();
  });

  // Find in skills (e.g. HTML, web, JavaScript, SQL, PHP)
  var query4 = { "skills" : { $regex : "html" , $options : "i" } };
  dbo.collection("applicants").find(query4).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 4: Search in skills complete");
    db.close();
  });

  // Find in experience (e.g. team)
  var query5 = { "experience" : { $regex : "team" , $options : "i" } };
  dbo.collection("applicants").find(query5).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 5: Search in experience complete");
    db.close();
  });

  // Find in projects (e.g. www.)
  var query6 = { "projects" : { $regex : "www." , $options : "i" } };
  dbo.collection("applicants").find(query6).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 6: Search in projects complete");
    db.close();
  });

  // Find in technology (e.g. Outlook, Office)
  var query7 = { "technology" : { $regex : "outlook" , $options : "i" } };
  dbo.collection("applicants").find(query7).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 7: Search in technology complete");
    db.close();
  });
  
  // Find in languages (e.g. English)
  var query8 = { "languages" : { $regex : "English" , $options : "i" } };
  dbo.collection("applicants").find(query8).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 8: Search in languages complete");
    db.close();
  });

  // Find in entire resume (e.g. date like 01 “June 2017” or “Apr. 2017”, e.g. location like CA, California, e.g. LinkedIn or Github)
  var query9a = {name:"text", email:"text", objective:"text", education:"text", experience:"text", technology:"text", skills:"text", languages:"text", projects:"text"};
  dbo.collection("applicants").createIndex(query9a, function(err, result) {
    if (err) throw err;
    console.log("Text index " + result + " created successfully");
    db.close();
  });
  
  var query9b = { $text : { $search : "english" } };
  dbo.collection("applicants").find(query9b).toArray(function(err, result) {
    if (err) throw err;
    console.log("Text index search complete");
    db.close();
  });

  // Find the count of resumes with some text
  // Only works if run after query9a
  var query10 = { $text : { $search : "english" } };
  dbo.collection("applicants").find(query10).count(function(err, result) {
    if (err) throw err;
    console.log("Number of resumes with the text: " + result);
    db.close();
  });

  // Find all names
  var query11a = { projection : { _id : 0 , "name" : 1 } };
  dbo.collection("applicants").find({}, query11a).toArray(function(err, result) {
    if (err) throw err;
    console.log("The names are:\n" + JSON.stringify(result));
    db.close();
  });

  // Find all emails
  var query11b = { projection : { _id : 0 , "email" : 1 } };
  dbo.collection("applicants").find({}, query11b).toArray(function(err, result) {
    if (err) throw err;
    console.log("The emails are:\n" + JSON.stringify(result));
    db.close();
  });

  // Find interviewed (true/false)
  var query12 = { "interviewed" : true }; // or false
  dbo.collection("applicants").find(query12).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 12: interviewed search complete");
    db.close();
  });

  // Find hired (true/false)
  var query13 = { "hired" : true }; // or false
  dbo.collection("applicants").find(query13).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 13: hired search complete");
    db.close();
  });

  // Find offered (true/false)
  var query14 = { "offered" : true }; // or false
  dbo.collection("applicants").find(query14).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 14: offered search complete");
    db.close();
  });

  // Find otherOffer (true/false)
  var query15 = { "otherOffer" : true }; // or false
  dbo.collection("applicants").find(query15).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 15: otherOffer search complete");
    db.close();
  });

  // Find by position
  var query16 = { "position" : "" };
  dbo.collection("applicants").find(query16).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    //console.log("Query 16: position search complete");
    db.close();
  });

  // Update interviewed status (true/false)
  var query17 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "interviewed" : true } }; // or false
  dbo.collection("applicants").updateOne(query17, update, function(err, result) {
    if (err) throw err;
    console.log("Query 17: interviewed status has been updated");
    db.close();
  });

  // Update hired status (true/false)
  var query18 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "hired" : true } }; // or false
  dbo.collection("applicants").updateOne(query18, update, function(err, result) {
    if (err) throw err;
    console.log("Query 18: hired status has been updated");
    db.close();
  });

  // Update offered status (true/false)
  var query19 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "offered" : true } }; // or false
  dbo.collection("applicants").updateOne(query19, update, function(err, result) {
    if (err) throw err;
    console.log("Query 19: offered status has been updated");
    db.close();
  });

  // Update otherOffer status (true/false)
  var query20 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "otherOffer" : true } }; // or false
  dbo.collection("applicants").updateOne(query20, update, function(err, result) {
    if (err) throw err;
    console.log("Query 20: otherOffer status has been updated");
    db.close();
  });*/