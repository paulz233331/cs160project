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

      var query2 = { "summary": { $regex: "software", $options: "i" } };
      dbo.collection("applicants").find(query2).toArray(function (err, result) {
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

      var query3 = { "objective": { $regex: "software", $options: "i" } };
      dbo.collection("applicants").find(query3).toArray(function (err, result) {
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

      var query4 = { "skills": { $regex: "html", $options: "i" } };
      dbo.collection("applicants").find(query4).toArray(function (err, result) {
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

      var query5 = { "experience": { $regex: "team", $options: "i" } };
      dbo.collection("applicants").find(query5).toArray(function (err, result) {
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

      var query6 = { "projects": { $regex: "www.", $options: "i" } };
      dbo.collection("applicants").find(query6).toArray(function (err, result) {
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

      var query7 = { "technology": { $regex: "outlook", $options: "i" } };
      dbo.collection("applicants").find(query7).toArray(function (err, result) {
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

      var query8 = { "languages": { $regex: "English", $options: "i" } };
      dbo.collection("applicants").find(query8).toArray(function (err, result) {
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

      var query9a = { name: "text", email: "text", objective: "text", education: "text", experience: "text", technology: "text", skills: "text", languages: "text", projects: "text" };
      dbo.collection("applicants").createIndex(query9a, function (err, result) {
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

      var query9b = { $text: { $search: "professional" } };
      dbo.collection("applicants").find(query9b).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('D A');
        expect(result[0].email).toEqual('faiz.afthab@gmail.com');
      });
      db.close();

    });
  });

  test("Query 10", () => {

    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query10 = { $text: { $search: "english" } };
      dbo.collection("applicants").find(query10).count(function (err, result) {
        if (err) throw err;
        expect(result).toEqual(5);
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


  test("Query 21", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query21 = { projection: { _id: 0, name: 1, "profile.hardworking": 1 } };
      var sort21 = { "profile.hardworking": -1 };
      dbo.collection("test").find({}, query21).sort(sort21).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('L V');
        expect(result[0].profile.hardworking).toEqual(15);
        expect(result[1].name).toEqual('E\nName');
        expect(result[1].profile.hardworking).toEqual(13);
        expect(result[2].name).toEqual('Business Development');
        expect(result[2].profile.hardworking).toEqual(13);
        expect(result[3].name).toEqual('P\nR');
        expect(result[3].profile.hardworking).toEqual(11);
        expect(result[4].name).toEqual('Sinhgad Technical');
        expect(result[4].profile.hardworking).toEqual(10);
      });
      db.close();
    });
  });

  test("Query 22", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query22 = { projection: { _id: 0, name: 1, "profile.experience": 1 } };
      var sort22 = { "profile.experience": -1 };
      dbo.collection("test").find({}, query22).sort(sort22).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('P\nR');
        expect(result[0].profile.experience).toEqual(76);
        expect(result[1].name).toEqual('Microsoft Word');
        expect(result[1].profile.experience).toEqual(65);
        expect(result[2].name).toEqual('E\nR');
        expect(result[2].profile.experience).toEqual(52);
        expect(result[3].name).toEqual('A R');
        expect(result[3].profile.experience).toEqual(48);
        expect(result[4].name).toEqual('E\nName');
        expect(result[4].profile.experience).toEqual(36);
      });
      db.close();
    });
  });

  test("Query 23", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query23 = { projection: { _id: 0, name: 1, "profile.intelligence": 1 } };
      var sort23 = { "profile.intelligence": -1 };
      dbo.collection("test").find({}, query23).sort(sort23).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('P\nR');
        expect(result[0].profile.intelligence).toEqual(18);
        expect(result[1].name).toEqual('Sunil Kumar');
        expect(result[1].profile.intelligence).toEqual(11);
        expect(result[2].name).toEqual('Core Competencies');
        expect(result[2].profile.intelligence).toEqual(10);
        expect(result[3].name).toEqual('A R');
        expect(result[3].profile.intelligence).toEqual(9);
        expect(result[4].name).toEqual('Business Development');
        expect(result[4].profile.intelligence).toEqual(9);
      });
      db.close();
    });
  });

  test("Query 24", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query24 = { projection: { _id: 0, name: 1, "profile.leadership": 1 } };
      var sort24 = { "profile.leadership": -1 };
      dbo.collection("test").find({}, query24).sort(sort24).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('P\nR');
        expect(result[0].profile.leadership).toEqual(11);
        expect(result[1].name).toEqual('Chakravarthy\nOperations');
        expect(result[1].profile.leadership).toEqual(11);
        expect(result[2].name).toEqual('L V');
        expect(result[2].profile.leadership).toEqual(9);
        expect(result[3].name).toEqual('Sample C');
        expect(result[3].profile.leadership).toEqual(8);
        expect(result[4].name).toEqual('Dilkhush Bharucha');
        expect(result[4].profile.leadership).toEqual(7);
      });
      db.close();
    });
  });

  test("Query 25", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

      var query25 = { projection: { _id: 0, name: 1, "profile.organization": 1 } };
      var sort25 = { "profile.organization": -1 };
      dbo.collection("test").find({}, query25).sort(sort25).toArray(function (err, result) {
        if (err) throw err;
        expect(result[0].name).toEqual('P\nR');
        expect(result[0].profile.organization).toEqual(26);
        expect(result[1].name).toEqual('Business Development');
        expect(result[1].profile.organization).toEqual(19);
        expect(result[2].name).toEqual('L V');
        expect(result[2].profile.organization).toEqual(18);
        expect(result[3].name).toEqual('L D');
        expect(result[3].profile.organization).toEqual(17);
        expect(result[4].name).toEqual('E\nName');
        expect(result[4].profile.organization).toEqual(16);
      });
      db.close();
    });
  });

  test("Query 26", () => {
    MongoClient.connect(url, function (err, db) { //{ useUnifiedTopology: true },
      if (err) throw err;
      var dbo = db.db("mydb");

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
        expect(result[0]).toEqual({ "_id": "H S", "score": 142 });
        expect(result[1]).toEqual({ "_id": "P\nR", "score": 142 });
        expect(result[2]).toEqual({ "_id": "M V", "score": 124 });
        expect(result[3]).toEqual({ "_id": "E\nR", "score": 94 });
        expect(result[4]).toEqual({ "_id": "Microsoft Word", "score": 87 });
      });
      db.close();
    });
  });

  // setTimeout(function(){ db.close(); }, 4000);
}); //end describe