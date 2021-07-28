var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://appt:appt@127.17.0.1:27017/mydb?authSource=admin"

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

    //find an applicant and parse it (useful for Task #88).
    //    var myobj = { employer: "Company Inc", email : "asdf@gmail.com", job_title : "swe" };

    dbo.collection("applicants").findOne({}, function(err, result) {
        if (err) throw err;
        //db.close();
        console.log(result);
        console.log(result._id);
        console.log(result.name);
        console.log(result.email);
        console.log(result.objective);
        console.log(result.summary);
        console.log(result.technology);
        console.log(result.skills);
        console.log(result.experience);
        console.log(result.education);
        console.log(result.skype);
        console.log(result.hired);
        console.log(result.interviewed);
        console.log(result.offered);
        console.log(result.otherOffer);
        console.log(result.position);
        db.close();
    });
});

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

    //find an applicant and parse it (useful for Task #88).
    //    var myobj = { employer: "Company Inc", email : "asdf@gmail.com", job_title : "swe" };

    dbo.collection("employers").findOne({}, function(err, result) {
        if (err) throw err;
        //db.close();
        console.log(result);
        console.log(result._id);
        console.log(result.email);
        console.log(result.job_title);
        db.close();
    });
});