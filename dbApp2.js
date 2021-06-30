//var mongoose=require('mongoose');
/*
mongoose.connect("mongodb://localhost:27017").catch(err => {
                                                console.log(err)
                                              });

                                              */
//mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://127.17.0.1:27017/mydb?authSource=admin"//"mongodb://dbApp:dbApp@54.205.24.189:27017/mydb?authSource=admin" //"mongodb://54.205.24.189:27017/mydb";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});