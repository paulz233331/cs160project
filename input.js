    'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const expr = exports.module = express();

var app = require('./app');

expr.use(bodyParser.urlencoded({ extended: true }));

expr.post('/test', function(req, res) {
  var resm = req.body.resume;
  //console.log(resm);

  fs.writeFile('public/resumeUpload.txt', resm, function (err) {
    if (err) return console.log(err);
    console.log('Resume > public/resumeUpload.txt');
  });

    app.main();
})

expr.listen(3000, function() {
  console.log('App is running on 3000');
})
