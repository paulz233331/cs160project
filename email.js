var fs = require('fs');
var nodemailer = require('nodemailer');
var readline = require('')

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb"//"mongodb://127.17.0.1:27017/mydb?authSource=admin"

module.exports = {
    sendAppCfm, sendJobCfm
};

function sendAppCfm(resm, username, password) {
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var db1 = db.db("mydb");

        var query = { "name": resm.name, "email" : resm.email };
        var projection = { projection: { _id: 0, "email": 1 } };
        db1.collection("applicants").findOne(query, projection, function (err, result) {
            if (err) throw err;
            if (result == null) {
                console.log('Email not found');
            }
            // var len = JSON.stringify(result).length - 2;
            var email = {
                from: transport.user,
                to: resm.email, // applicant.email
                // Instead of resm.email we can use:
                // JSON.stringify(result).slice(10, len), which takes the email from the database
                subject: 'Application Confirmation Email',
                text: 'Dear ' + applicant.name + ', \n\nYour application for ' +
                    result.job_title + ' at ' + result.employer + ' has been submitted. ' +
                    'We appreciate your interest in our team!\n\nIf you are selected for a follow-up interview, a representative will contact you for further information.\n\nThanks, \n' + result.employer +
                    '\n\nPlease do not reply to this email.'
            };

            transport.sendMail(email, function (err, info) {
                if (err) throw err;
                if (info.response.slice(0, 3) == "250") { // add 550
                    let data = JSON.stringify(email);
                    fs.writeFileSync('sentAppCfm.json', data);
                    console.log('Applicant email confirmation has been sent. ' + info.response);
                } else {
                    console.log('Applicant email confirmation was not sent. ' + info.response);
                }
            });

            db.close();
        });
    });
}

function sendJobCfm(req) {
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lucentats@gmail.com',
            pass: ''
        }
    });

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var db1 = db.db("mydb");

        var jobListing = { employer: req.body.company, email: req.body.email, job_title: req.body.jobTitle };
        var projection = { projection: { _id: 0, "email": 1 } };

        dbo.collection("employers").findOne(jobListing, projection, function (err, result) {
            if (err) throw err;
            if (result == null) {
                console.log('Email not found');
            }
            // var len = JSON.stringify(result).length - 2;
            var email = {
                from: transport.user,
                to: req.body.email, // applicant.email
                // Instead of applicant.email we can use:
                // JSON.stringify(result).slice(10, len), which takes the email from the database
                subject: 'Job Listing Creation Confirmation Email',
                text: 'Dear ' + result.employer + ', \n\nYour ' +
                    result.job_title + ' job listing has been created. ' +
                    '\n\nPlease do not reply to this email.'
            };

            transport.sendMail(email, function (err, info) {
                if (err) throw err;
                if (info.response.slice(0, 3) == "250") { // add 550
                    let data = JSON.stringify(email);
                    fs.writeFileSync('sentJobCfm.json', data);
                    console.log('Job listing creation confirmation has been sent. ' + info.response);
                } else {
                    console.log('Job listing creation confirmation was not sent. ' + info.response);
                }
            });

            db.close();
        });
    });
}