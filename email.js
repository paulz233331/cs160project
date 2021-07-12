var fs = require ('fs');
var nodemailer = require('nodemailer');

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"//"mongodb://127.17.0.1:27017/mydb?authSource=admin"

let rawdata = fs.readFileSync('compiled/resumeUpload.json');
let applicant = JSON.parse(rawdata);

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lucentats@gmail.com',
        pass: 'aA123456789!'
    }
});

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var db1 = db.db("mydb");

    var query = { "name" : applicant.name };
    var projection = { projection : { _id : 0, "email" : 1 } };
    db1.collection("applicants").findOne(query, projection, function(err, result) {
        if (err) throw err;
        var len = JSON.stringify(result).length - 2;
        var email = { 
            from: 'lucentats@gmail.com',
            to: applicant.email, // applicant.email
            // Instead of applicant.email we can use:
            // JSON.stringify(result).slice(10, len), which takes the email from the database
            subject: 'Confirmation Email',
            text: 'Dear ' + applicant.name + ', \n\nYour application for ' + 
            result.job_title + ' at ' + result.employer + ' has been submitted. ' + 
            'We appreciate your interest in our team!\n\nIf you are selected for a follow-up interview, a representative will contact you for further information.\n\nThanks, \n' + result.employer +
            '\n\nPlease do not reply to this email.'
        };

        transport.sendMail(email, function(err, info) {
            if (err) throw err;
            if(info.response.slice(0, 3) == "250") { // add 550
                let data = JSON.stringify(email);
                fs.writeFileSync('sentEmail.json', data);
                console.log('Email confirmation has been sent. ' + info.response);
            } else {
                console.log('Email confirmation was not sent. ' + info.response);
            }
        });

        db.close();
    });
});