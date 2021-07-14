const { bold } = require('colors');
var mongo = require('mongodb');
jest.useFakeTimers();
var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"//"mongodb://dbApp:dbApp@54.205.24.189:27017/mydb?authSource=admin" //"mongodb://54.205.24.189:27017/mydb";

//var app = require('./../app');

/*beforeAll(async () => {
    return await app.main();
});
*/

describe("Testing with Jest", () => {

  test("Query 1", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query1 = { "education": { $regex: "university", $options: "i" } };
      dbo.collection("applicants").find(query1).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Alex Dubinchyk');
        expect(result[0].email).toEqual('alexs.dbk@gmail.com');
        expect(result[0].objective).toEqual('Seeking a challenging position to use my software Web development and process optimization\n' +
          'skills.');
      });
      db.close();

    }); //end connect
  }); //end test

  test("Query 2", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "summary": { $regex: "software", $options: "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Alex Dubinchyk');
        expect(result[0].email).toEqual('alexs.dbk@gmail.com');
      });
      db.close();

    }); //end connect
  }); //end test

  test("Query 3", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "objective": { $regex: "software", $options: "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Alex Dubinchyk');
        expect(result[0].email).toEqual('alexs.dbk@gmail.com');
      });
      db.close();

    });
  });

  test("Query 4", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "skills" : { $regex : "html" , $options : "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Alex Dubinchyk');
        expect(result[0].email).toEqual('alexs.dbk@gmail.com');
      });
      db.close();

    });
  });

  test("Query 5", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "experience" : { $regex : "team" , $options : "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Sunil Kumar');
        expect(result[0].email).toEqual('sunilkumarbt01@gmail.com');
      });
      db.close();

    });
  });

  test("Query 6", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "projects" : { $regex : "www." , $options : "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Sunil Kumar');
        expect(result[0].email).toEqual('sunilkumarbt01@gmail.com');
      });
      db.close();

    });
  });

  test("Query 7", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "technology" : { $regex : "outlook" , $options : "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Prem Prakash');
        expect(result[0].email).toEqual('premgautam958@gmail.com');
      });
      db.close();

    });
  });

  test("Query 8", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { "languages" : { $regex : "English" , $options : "i" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Prem Prakash');
        expect(result[0].email).toEqual('premgautam958@gmail.com');
      });
      db.close();

    });
  });

  test("Query 9a", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query9a = {name:"text", email:"text", objective:"text", education:"text", experience:"text", technology:"text", skills:"text", languages:"text", projects:"text"};
      dbo.collection("applicants").createIndex(query9a, function(err, result) {
        if (err) throw err;
        expect(result).toEqual('name_text_email_text_objective_text_education_text_experience_text_technology_text_skills_text_languages_text_projects_text');
      });
      db.close();

    });
  });

  test("Query 9b", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query = { $text : { $search : "professional" } };
      dbo.collection("applicants").find(query).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Prem Prakash');
        expect(result[0].email).toEqual('premgautam958@gmail.com');
      });
      db.close();

    });
  });

  test("Query 10", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query10 = { $text : { $search : "english" } };
      dbo.collection("applicants").find(query10).count(function(err, result) {
        if (err) throw err;
        expect(result).toEqual(4);
      });
      db.close();

    });
  });

  test("Query 11b", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Find all emails
      var query11b = { projection: { _id: 0, "email": 1 } };
      dbo.collection("applicants").find({}, query11b).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].email).toEqual("alexs.dbk@gmail.com");
      });
      db.close();

    }); //end connect
  }); //end test

  test("Query 11a", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Find all names
      var query11a = { projection: { _id: 0, "name": 1 } };
      dbo.collection("applicants").find({}, query11a).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Alex Dubinchyk');
        db.close();
      });
    }); //end connect
  }); //end test

  test("Query 12", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Find interviewed (true/false)
      var query12 = { "interviewed": true }; // or false
      dbo.collection("applicants").find(query12).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual("M V");
        db.close();
      });
    }); //end connect
  }); //end test

  test("Query 13", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      // Find hired (true/false)
      var query13 = { "hired": true }; // or false
      dbo.collection("applicants").find(query13).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual("M V");
        db.close();
      });
    }); //end connect
  }); //end test

  test("Query 14", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Find offered (true/false)
      var query14 = { "offered": true }; // or false
      dbo.collection("applicants").find(query14).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual("M V");
        db.close();
      });
    }); //end connect
  }); //end test

  test("Query 15", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Find otherOffer (true/false)
      var query15 = { "otherOffer": true }; // or false
      dbo.collection("applicants").find(query15).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual("M V");
        db.close();
      });
    }); //end connect
  }); //end test

  test("Query 16", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Find by position
      var query16 = { "position": "" };
      dbo.collection("applicants").find(query16).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('Alex Dubinchyk');
        db.close();
      });
    }); //end connect
  }); //end test

  test("Query 17", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Update interviewed status (true/false)
      var query17 = { "name": "M V", "email": "rajaktashinde2211@gmail.com" };
      var update = { $set: { "interviewed": true } }; // or false
      dbo.collection("applicants").updateOne(query17, update, function (err, result) {
        if (err) throw err;
        dbo.collection("applicants").findOne(query17, function (err, result) {
          expect(result.interviewed).toBeTruthy();
          db.close();
        });
      });
    }); //end connect
  }); //end test

  test("Query 18", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Update hired status (true/false)
      var query18 = { "name": "M V", "email": "rajaktashinde2211@gmail.com" };
      var update = { $set: { "hired": true } }; // or false
      dbo.collection("applicants").updateOne(query18, update, function (err, result) {
        if (err) throw err;
        dbo.collection("applicants").findOne(query18, function (err, result) {
          expect(result.hired).toBeTruthy();
          db.close();
        });
      });
    }); //end connect
  }); //end test

  test("Query 19", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Update offered status (true/false)
      var query19 = { "name": "M V", "email": "rajaktashinde2211@gmail.com" };
      var update = { $set: { "offered": true } }; // or false
      dbo.collection("applicants").updateOne(query19, update, function (err, result) {
        if (err) throw err;
        dbo.collection("applicants").findOne(query19, function (err, result) {
          expect(result.offered).toBeTruthy();
          db.close();
        });
      });
    }); //end connect
  }); //end test


  test("Query 20", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");
      // Update otherOffer status (true/false)
      var query20 = { "name": "M V", "email": "rajaktashinde2211@gmail.com" };
      var update = { $set: { "otherOffer": true } }; // or false
      dbo.collection("applicants").updateOne(query20, update, function (err, result) {
        if (err) throw err;
        dbo.collection("applicants").findOne(query20, function (err, result) {
          expect(result.otherOffer).toBeTruthy();
          db.close();
        });
      });
    }); //end connect
  }); //end test

  // setTimeout(function(){ db.close(); }, 4000);
}); //end describe