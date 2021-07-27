const { bold } = require('colors');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"//"mongodb://dbApp:dbApp@54.205.24.189:27017/mydb?authSource=admin" //"mongodb://54.205.24.189:27017/mydb";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  // Find in education (e.g. University, College)
  var query1 = { "education" : { $regex : "university" , $options : "i" } };
  dbo.collection("applicants").find(query1).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 1: Search in education complete");
    // console.log(result);
  });

  // Find in summary (e.g. work, opportunity)
  var query2 = { "summary" : { $regex : "software" , $options : "i" } };
  dbo.collection("applicants").find(query2).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 2: Search in summary complete");
    // console.log(result);
  });

  // Find in objective (e.g. work, software, engineer)
  var query3 = { "objective" : { $regex : "software" , $options : "i" } };
  dbo.collection("applicants").find(query3).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 3: Search in objective complete");
    // console.log(result);
  });

  // Find in skills (e.g. HTML, web, JavaScript, SQL, PHP)
  var query4 = { "skills" : { $regex : "html" , $options : "i" } };
  dbo.collection("applicants").find(query4).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 4: Search in skills complete");
    // console.log(result);
  });

  // Find in experience (e.g. team)
  var query5 = { "experience" : { $regex : "team" , $options : "i" } };
  dbo.collection("applicants").find(query5).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 5: Search in experience complete");
    // console.log(result);
  });

  // Find in projects (e.g. www.)
  var query6 = { "projects" : { $regex : "www." , $options : "i" } };
  dbo.collection("applicants").find(query6).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 6: Search in projects complete");
    // console.log(result);
  });

  // Find in technology (e.g. Outlook, Office)
  var query7 = { "technology" : { $regex : "outlook" , $options : "i" } };
  dbo.collection("applicants").find(query7).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 7: Search in technology complete");
    // console.log(result);
  });

  // Find in languages (e.g. English)
  var query8 = { "languages" : { $regex : "English" , $options : "i" } };
  dbo.collection("applicants").find(query8).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 8: Search in languages complete");
    // console.log(result);
  });

  // Find in entire resume (e.g. date like 01 “June 2017” or “Apr. 2017”, e.g. location like CA, California, e.g. LinkedIn or Github)
  var query9a = {name:"text", email:"text", objective:"text", education:"text", experience:"text", technology:"text", skills:"text", languages:"text", projects:"text"};
  dbo.collection("applicants").createIndex(query9a, function(err, result) {
    if (err) throw err;
    console.log("Text index " + result + " created successfully");
  });

  // Search for a keyword in the text index created in 9a
  var query9b = { $text : { $search : "professional" } };
  dbo.collection("applicants").find(query9b).toArray(function(err, result) {
    if (err) throw err;
    console.log("Text index search complete");
    // console.log(result);
  });

  // Find the count of resumes with some text
  // Only works if run after query9a
  var query10 = { $text : { $search : "english" } };
  dbo.collection("applicants").find(query10).count(function(err, result) {
    if (err) throw err;
    console.log("Number of resumes with the text: " + result);
  });

  // Find all names
  var query11a = { projection : { _id : 0 , "name" : 1 } };
  dbo.collection("applicants").find({}, query11a).toArray(function(err, result) {
    if (err) throw err;
    console.log("The names are:\n" + JSON.stringify(result));
  });

  // Find all emails
  var query11b = { projection : { _id : 0 , "email" : 1 } };
  dbo.collection("applicants").find({}, query11b).toArray(function(err, result) {
    if (err) throw err;
    console.log("The emails are:\n" + JSON.stringify(result));
  });

  // Find interviewed (true/false)
  var query12 = { "interviewed" : true }; // or false
  dbo.collection("applicants").find(query12).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 12: interviewed search complete");
    // console.log(result);
  });

  // Find hired (true/false)
  var query13 = { "hired" : true }; // or false
  dbo.collection("applicants").find(query13).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 13: hired search complete");
    // console.log(result);
  });

  // Find offered (true/false)
  var query14 = { "offered" : true }; // or false
  dbo.collection("applicants").find(query14).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 14: offered search complete");
    // console.log(result);
  });

  // Find otherOffer (true/false)
  var query15 = { "otherOffer" : true }; // or false
  dbo.collection("applicants").find(query15).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 15: otherOffer search complete");
    // console.log(result);
  });

  // Find by position
  var query16 = { "position" : "" };
  dbo.collection("applicants").find(query16).toArray(function(err, result) {
    if (err) throw err;
    console.log("Query 16: position search complete");
    // console.log(result);
  });

  // Update interviewed status (true/false)
  var query17 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "interviewed" : true } }; // or false
  dbo.collection("applicants").updateOne(query17, update, function(err, result) {
    if (err) throw err;
    console.log("Query 17: interviewed status has been updated");
  });

  // Update hired status (true/false)
  var query18 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "hired" : true } }; // or false
  dbo.collection("applicants").updateOne(query18, update, function(err, result) {
    if (err) throw err;
    console.log("Query 18: hired status has been updated");
  });

  // Update offered status (true/false)
  var query19 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "offered" : true } }; // or false
  dbo.collection("applicants").updateOne(query19, update, function(err, result) {
    if (err) throw err;
    console.log("Query 19: offered status has been updated");
  });

  // Update otherOffer status (true/false)
  var query20 = { "name" : "M V" , "email" : "rajaktashinde2211@gmail.com" };
  var update = { $set : { "otherOffer" : true } }; // or false
  dbo.collection("applicants").updateOne(query20, update, function(err, result) {
    if (err) throw err;
    console.log("Query 20: otherOffer status has been updated");
  });

  // returns 5 applicants with the highest profile.hardworking
  var query21 = { projection: { _id: 0, name: 1, "profile.hardworking": 1 } };
  var sort21 = { "profile.hardworking": -1 };
  dbo.collection("test").find({}, query21).sort(sort21).toArray(function (err, result) {
    if (err) throw err;
    console.log("The 5 applicants with the highest hardworking scores are: ");
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(result[i]));
    }
  });

  // returns 5 applicants with the highest profile.experience
  var query22 = { projection: { _id: 0, name: 1, "profile.experience": 1 } };
  var sort22 = { "profile.experience": -1 };
  dbo.collection("test").find({}, query22).sort(sort22).toArray(function (err, result) {
    if (err) throw err;
    console.log("The 5 applicants with the highest experience scores are: ");
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(result[i]));
    }
  });

  // returns 5 applicants with the highest profile.intelligence
  var query23 = { projection: { _id: 0, name: 1, "profile.intelligence": 1 } };
  var sort23 = { "profile.intelligence": -1 };
  dbo.collection("test").find({}, query23).sort(sort23).toArray(function (err, result) {
    if (err) throw err;
    console.log("The 5 applicants with the highest intelligence scores are: ");
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(result[i]));
    }
  });

  // returns 5 applicants with the highest profile.leadership
  var query24 = { projection: { _id: 0, name: 1, "profile.leadership": 1 } };
  var sort24 = { "profile.leadership": -1 };
  dbo.collection("test").find({}, query24).sort(sort24).toArray(function (err, result) {
    if (err) throw err;
    console.log("The 5 applicants with the highest leadership scores are: ");
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(result[i]));
    }
  });

  // returns 5 applicants with the highest profile.organization
  var query25 = { projection: { _id: 0, name: 1, "profile.organization": 1 } };
  var sort25 = { "profile.organization": -1 };
  dbo.collection("test").find({}, query25).sort(sort25).toArray(function (err, result) {
    if (err) throw err;
    console.log("The 5 applicants with the highest organization scores are: ");
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(result[i]));
    }
  });

  // Query 26: returns 5 applicants with the highest total profile score
  dbo.collection("test").aggregate([
    {
      "$group": {
        _id: "$name",
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
        "score": -1, name : 1
      }
    }
  ]).toArray(function (err, result) {
    if (err) throw err;
    console.log("The 5 applicants with the highest profile score are: ");
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(result[i]));
    }
  });

  setTimeout(function () { db.close(); }, 3000);
});