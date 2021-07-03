var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://127.17.0.1:27017/mydb?authSource=admin"

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

    //insert myobj if its not already there.
    var myobj = { employer: "Company Inc", email : "asdf@gmail.com", job_title : "swe" };

    dbo.collection("employers").findOne(myobj, function(err, result) {
        if (err) throw err;
        //db.close();
        console.log(result);
        if (result == null){
            dbo.collection("employers").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                console.log(myobj._id);
                db.close();
              });
        }
    });


});