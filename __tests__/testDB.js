'use strict';
const fs = require('fs');
var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://127.17.0.1:27017/mydb?authSource=admin"

describe("Testing with Jest", () => {

  test("applicants insertOne", () => {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
            var myobj = {
                          _id: "60e0028483e71d19708c513d",
                          name: 'Alex Dubinchyk',
                          email: 'alexs.dbk@gmail.com',
                          objective: 'Seeking a challenging position to use my software Web development and process optimization\n' +
                            'skills.',
                          summary: 'I worked on a wide range of products including building advanced dynamic multi language web\n' +
                            "sites, internal and external API's, well as creating new internal workflows. My goal is to work in\n" +
                            'a passionate team, that loves their work and the products they are creating together, supporting,\n' +
                            "mentoring, optimizing workflows and creating high quality software. I'm energenic, solution\n" +
                            'oriented team-player, constantly learning and growing as a team, and bringing high spirits along\n' +
                            'with me.',
                          technology: 'Server side PHP programming, REST, OPP, MVC, Yii framework.\n' +
                            'SQL Database programming: MySQL, SQL, MSSQL.\n' +
                            'Client-side programming: JavaScript, AJAX, jQuery.\n' +
                            'Smarty Template Engine, HTML5, CSS3.\n' +
                            'Webserver installation and configuration: Apache, Nginx, IIS.\n' +
                            'Source control: SVN/Subversion, GIT.\n' +
                            'Platforms: Linux, Mac, Windows.',
                          skills: 'Server side PHP programming, REST, OPP, MVC, Yii framework.\n' +
                            'SQL Database programming: MySQL, SQL, MSSQL.\n' +
                            'Client-side programming: JavaScript, AJAX, jQuery.\n' +
                            'Smarty Template Engine, HTML5, CSS3.\n' +
                            'Webserver installation and configuration: Apache, Nginx, IIS.\n' +
                            'Source control: SVN/Subversion, GIT.\n' +
                            'Platforms: Linux, Mac, Windows.',
                          experience: 'Actuate http://www.actuate.com/\n' +
                            'Full stack PHP Developer\n' +
                            'San Manteo, CA. November 2014 - current\n' +
                            'Implemented web service(API, MVC, Php)\n' +
                            'Introduced Git to the team\n' +
                            'BloomSky http://www.bloomsky.com\n' +
                            'Backend Developer\n' +
                            'Sunnyvale, CA. October 2014 - November 2014\n' +
                            'Integrated APIs (PHP, Python, Django, Nginx)\n' +
                            'Set up PHPUnit and functional testing\n' +
                            'Deploy merge DB script (MSSQL>MySQL)\n' +
                            'Rozumsoft LLC, / Telecontact LLC http://www.telecontact.ru/\n' +
                            'Full stack PHP Developer\n' +
                            'Belarus, Minsk. February 2012 - September 2014\n' +
                            'Programming modules of dynamically building statistics for quality control assessment project.\n' +
                            'Designed and developed project quality control assessment that estimated effective work of\n' +
                            'operators in callcenters from different regions. Includes modules separation mapping based on\n' +
                            'more 20 users roles(RBAC), online editors(logs, statistical formulas, projects rules and etc) for\n' +
                            'more 10k clients.\n' +
                            'Finalization coding script of internal protection algorithm authorization and validation.\n' +
                            'Programming API service for quality control assessment. Interact with user interface(AJAX)\n' +
                            'with fast load up JSON data, audio files and extract large data in excel.\n' +
                            'API data exchange integrated with data parse, merge, view in table linkage, send emails.\n' +
                            'Support more 100 source, near 1000 onlineusers, more 10 servers.\n' +
                            'Codes cross-browsers users interfaces in project quality control assessment, using Javascript,\n' +
                            'jQuery, JSON, Bootstrap.\n' +
                            'Developed JavaScript audio player with individual custom design, hardware acceleration,\n' +
                            'deceleration and the order to play audio files.\n' +
                            'Designed and developed the company website (http://www.rozumsoft.com/).\n' +
                            'Implemented 3 domain zones(ru/by/com) algorithm.\n' +
                            'Codes contents editor for 3 languages\n' +
                            'Fixed and support custom seo map logic.\n' +
                            'Developed scripts products to callcenters operators\n' +
                            'Development of сomplex reports and statistical summaries by Cisco data telephony.\n' +
                            'Redesigned and reimplemented projects using MVC approach and strong OOP design\n' +
                            'Designed and conversion of scripts database, extensive SQL query optimization.\n' +
                            'Real Estate Agency Assistant heals LLC, Full stack PHP Developer\n' +
                            'Belarus, Minsk, http://www.a-h.by; May 2011 - January 2012\n' +
                            'Dynamic website design and programming using PHP, MySQL, HTML, CSS. Setup and\n' +
                            'administration of web servers and server software.\n' +
                            'Business consulting of securing/ planning project.\n' +
                            'Development to online marketing, search engine placement and promotion\n' +
                            '(http://www.mogu.by; http://www.a-h.by).',
                          education: 'Belarusian University of Informatics and Radioelectronics,\n' +
                            'BS in Modeling and computer-aided design of radioelectronics devices.\n' +
                            'Profiles\n' +
                            'https://github.com/aldb\n' +
                            'https://www.linkedin.com/pub/alex-dubinchyk/a0/54b/760/en\n' +
                            'skype: cool-skype-id',
                          skype: 'cool-skype-id',
                          hired: false,
                          interviewed: false,
                          offered: false,
                          otherOffer: false,
                          position: ''
                        };
            dbo.collection("applicants").findOne(myobj, function(err, result) {
                if (err) throw err;
                if (result == null){
                    dbo.collection("applicants").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        var newValues = { $set: {hired: false, offered: false, interviewed: false, position : "", otherOffer : false } };
                        dbo.collection("applicants").updateOne({_id: myobj._id}, newValues , function(err, res) {
                                                    if (err) throw err;
                                                    dbo.collection("applicants").findOne(myobj, function(err, result) {
                                                        expect(result).toEqual(myobj);
                                                        db.close();
                                                    });
                                                  });
                      });
                }
            });
        }); //end MongoClient.connect
  });

  test("employers insertOne", () => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
        var myobj = { employer: "Company Inc", email : "asdf@gmail.com", job_title : "swe" };
        dbo.collection("employers").findOne(myobj, function(err, result) {
            if (err) throw err;
            console.log(result);
            if (result == null){
                dbo.collection("employers").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    dbo.collection("employers").findOne(myobj, function(err, result) {
                        expect(myobj).toEqual(result);
                        db.close();
                    });
                  });
            }
        });
    });
  });

  test("applicants findOne", () => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = {
                _id: "60e0028483e71d19708c513d",
                name: 'Alex Dubinchyk',
                email: 'alexs.dbk@gmail.com',
                objective: 'Seeking a challenging position to use my software Web development and process optimization\n' +
                  'skills.',
                summary: 'I worked on a wide range of products including building advanced dynamic multi language web\n' +
                  "sites, internal and external API's, well as creating new internal workflows. My goal is to work in\n" +
                  'a passionate team, that loves their work and the products they are creating together, supporting,\n' +
                  "mentoring, optimizing workflows and creating high quality software. I'm energenic, solution\n" +
                  'oriented team-player, constantly learning and growing as a team, and bringing high spirits along\n' +
                  'with me.',
                technology: 'Server side PHP programming, REST, OPP, MVC, Yii framework.\n' +
                  'SQL Database programming: MySQL, SQL, MSSQL.\n' +
                  'Client-side programming: JavaScript, AJAX, jQuery.\n' +
                  'Smarty Template Engine, HTML5, CSS3.\n' +
                  'Webserver installation and configuration: Apache, Nginx, IIS.\n' +
                  'Source control: SVN/Subversion, GIT.\n' +
                  'Platforms: Linux, Mac, Windows.',
                skills: 'Server side PHP programming, REST, OPP, MVC, Yii framework.\n' +
                  'SQL Database programming: MySQL, SQL, MSSQL.\n' +
                  'Client-side programming: JavaScript, AJAX, jQuery.\n' +
                  'Smarty Template Engine, HTML5, CSS3.\n' +
                  'Webserver installation and configuration: Apache, Nginx, IIS.\n' +
                  'Source control: SVN/Subversion, GIT.\n' +
                  'Platforms: Linux, Mac, Windows.',
                experience: 'Actuate http://www.actuate.com/\n' +
                  'Full stack PHP Developer\n' +
                  'San Manteo, CA. November 2014 - current\n' +
                  'Implemented web service(API, MVC, Php)\n' +
                  'Introduced Git to the team\n' +
                  'BloomSky http://www.bloomsky.com\n' +
                  'Backend Developer\n' +
                  'Sunnyvale, CA. October 2014 - November 2014\n' +
                  'Integrated APIs (PHP, Python, Django, Nginx)\n' +
                  'Set up PHPUnit and functional testing\n' +
                  'Deploy merge DB script (MSSQL>MySQL)\n' +
                  'Rozumsoft LLC, / Telecontact LLC http://www.telecontact.ru/\n' +
                  'Full stack PHP Developer\n' +
                  'Belarus, Minsk. February 2012 - September 2014\n' +
                  'Programming modules of dynamically building statistics for quality control assessment project.\n' +
                  'Designed and developed project quality control assessment that estimated effective work of\n' +
                  'operators in callcenters from different regions. Includes modules separation mapping based on\n' +
                  'more 20 users roles(RBAC), online editors(logs, statistical formulas, projects rules and etc) for\n' +
                  'more 10k clients.\n' +
                  'Finalization coding script of internal protection algorithm authorization and validation.\n' +
                  'Programming API service for quality control assessment. Interact with user interface(AJAX)\n' +
                  'with fast load up JSON data, audio files and extract large data in excel.\n' +
                  'API data exchange integrated with data parse, merge, view in table linkage, send emails.\n' +
                  'Support more 100 source, near 1000 onlineusers, more 10 servers.\n' +
                  'Codes cross-browsers users interfaces in project quality control assessment, using Javascript,\n' +
                  'jQuery, JSON, Bootstrap.\n' +
                  'Developed JavaScript audio player with individual custom design, hardware acceleration,\n' +
                  'deceleration and the order to play audio files.\n' +
                  'Designed and developed the company website (http://www.rozumsoft.com/).\n' +
                  'Implemented 3 domain zones(ru/by/com) algorithm.\n' +
                  'Codes contents editor for 3 languages\n' +
                  'Fixed and support custom seo map logic.\n' +
                  'Developed scripts products to callcenters operators\n' +
                  'Development of сomplex reports and statistical summaries by Cisco data telephony.\n' +
                  'Redesigned and reimplemented projects using MVC approach and strong OOP design\n' +
                  'Designed and conversion of scripts database, extensive SQL query optimization.\n' +
                  'Real Estate Agency Assistant heals LLC, Full stack PHP Developer\n' +
                  'Belarus, Minsk, http://www.a-h.by; May 2011 - January 2012\n' +
                  'Dynamic website design and programming using PHP, MySQL, HTML, CSS. Setup and\n' +
                  'administration of web servers and server software.\n' +
                  'Business consulting of securing/ planning project.\n' +
                  'Development to online marketing, search engine placement and promotion\n' +
                  '(http://www.mogu.by; http://www.a-h.by).',
                education: 'Belarusian University of Informatics and Radioelectronics,\n' +
                  'BS in Modeling and computer-aided design of radioelectronics devices.\n' +
                  'Profiles\n' +
                  'https://github.com/aldb\n' +
                  'https://www.linkedin.com/pub/alex-dubinchyk/a0/54b/760/en\n' +
                  'skype: cool-skype-id',
                skype: 'cool-skype-id',
                hired: false,
                interviewed: false,
                offered: false,
                otherOffer: false,
                position: ''
        };

        dbo.collection("applicants").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            expect(result).toEqual(myobj);
            db.close();
        });
    });
  });

  test("employers findOne", () => {
      var myobj = { employer: "Company Inc", email : "asdf@gmail.com", job_title : "swe" };
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
            dbo.collection("employers").findOne({}, function(err, result) {
                if (err) throw err;
                expect(result).toEqual(myobj);
                db.close();
            });
        });
  });

});

