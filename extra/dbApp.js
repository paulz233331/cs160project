var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"//"mongodb://dbApp:dbApp@54.205.24.189:27017/mydb?authSource=admin" //"mongodb://54.205.24.189:27017/mydb";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});