const db = require("../models");
const Employer = db.employers;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Create a Tutorial
  const employer = new Employer({
    employer: req.body.employer,
    email: req.body.email,
    job_title: req.body.job_title
  });

  // Save Tutorial in the database
  employer
    .save(employer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employer."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  //console.log(req.query);
  var key, condition;
  if (req.query.job_title){
    key = req.query.job_title;
    condition = key ? { job_title : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.employer){
    key = req.query.employer;
    condition = key ? { employer : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.email){
    key = req.query.email;
    condition = key ? { email : { $regex: new RegExp(key), $options: "i" } } : {};
  }

//  console.log(condition);
  Employer.find(condition)
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Employer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employer with id=${id}. Maybe Employer was not found!`
        });
      } else res.send({ message: "Employer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employer with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employer.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employer with id=${id}. Maybe Employer was not found!`
        });
      } else {
        res.send({
          message: "Employer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employer with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Employer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllCondition = (req, res) => {
  Employer.find({ })
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