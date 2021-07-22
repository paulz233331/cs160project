const db = require("../models");
const Test = db.tests;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
  Test.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
