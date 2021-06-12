const express = require('express');
const bodyParser = require('body-parser');
const app = exports.module = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function(req, res) {
  var resm = req.body.resume;
  console.log(resm);
})

app.listen(3000, function() {
  console.log('App is running on 3000');
})