const db = require("../models");
const Test = db.tests;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Create a Tutorial
  const test = new Test({
    additional: req.body.additional,
    awards: req.body.awards,
    certification: req.body.certification,
    courses: req.body.courses,
    education: req.body.education,
    email: req.body.email,
    experience: req.body.experience,
    hired: req.body.hired,
    honors: req.body.honors,
    interests: req.body.interests,
    interviewed: req.body.interviewed,
    languages: req.body.languages,
    name: req.body.name,
    objective: req.body.objective,
    offered: req.body.offered,
    otherOffer: req.body.otherOffer,
    phone: req.body.phone,
    positions: req.body.positions, 
    position : req.body.position,
    profile:req.body.profile,
    projects: req.body.projects,
    skills:req.body.skills,
    summary: req.body.summary,
    technology: req.body.technology
  });

  // Save Tutorial in the database
  test
    .save(test)
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
  if (req.query.entire){
    condition =  { $text : { $search: req.query.entire } };
  }  
  else if (req.query.name){
    key = req.query.name;
    condition = key ? { name : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.email){
    key = req.query.email;
    condition = key ? { email : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.education){
    key = req.query.education;
    condition = key ? { education : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.summary){
    key = req.query.summary;
    condition = key ? { summary : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.objective){
    key = req.query.objective;
    condition = key ? { objective : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.skills){
    key = req.query.skills;
    condition = key ? { skills : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.experience){
    key = req.query.experience;
    condition = key ? { experience : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.projects){
    key = req.query.projects;
    condition = key ? { projects : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.technology){
    key = req.query.technology;
    condition = key ? { technology : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.languages){
    key = req.query.languages;
    condition = key ? { languages : { $regex: new RegExp(key), $options: "i" } } : {};
  }
  else if (req.query.interviewed){
    key = req.query.interviewed;
    condition = key ? { interviewed : true } : {};
  }
  //2
  else if (req.query.hired){
    key = req.query.hired;
    condition = key ? { hired : true } : {};
  }
  else if (req.query.offered){
    key = req.query.offered;
    condition = key ? { offered : true } : {};
  }
  else if (req.query.otherOffer){
    key = req.query.otherOffer;
    condition = key ? { otherOffer : true } : {};
  }
  else if (req.query.otherOffer){
    key = req.query.otherOffer;
    condition = key ? { otherOffer : true } : {};
  }
  //3
  else if (req.query.position){
    key = req.query.position;
    condition = key ? { "position.job_title": { $regex: req.query.position, $options: "i" } }: {};
  }
  //console.log(condition);
  Test.find(condition)
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


// Retrieve all Tutorials from the database.
exports.findAllNames = (req, res) => {
  Test.find({}, { _id: 0, "name": 1 } ).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAllEmails = (req, res) => {
  Test.find({}, { _id: 0, "email": 1 }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const name = req.query.name;
  var condition;

  if (req.body.interviewed != null){
    condition = {"$set" : { "interviewed" : req.body.interviewed } };  
  }
  else if (req.body.hired != null){
    condition = {$set : { "hired" : req.body.hired } };  
  }
  else if (req.body.offered != null){
    condition = {$set : { "offered" : req.body.offered } };  
  }
  else if (req.body.otherOffer != null){
    condition = {$set : { "otherOffer" : req.body.otherOffer } };  
  }

  //console.log(condition);

  Test.findOneAndUpdate(name, condition, { useFindAndModify: false })
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

exports.findByScores = (req, res) => {
  //console.log(req.query);
  if (req.query.overall === ""){
    Test.aggregate([{
      "$group": {
        "_id": {
              _id: "$_id", name: "$name", email: "$email", summary: "$summary", experience: "$experience", projects: "$projects",
              languages: "$languages", education: "$education", hired: "$hired", interviewed: "$interviewed",
              offered: "$offered", otherOffer: "$otherOffer", position: "$position", profile: "$profile"
            },
        score: {
          $sum: {
            $add: ["$profile.hardworking",
              "$profile.experience",
              "$profile.intelligence",
              "$profile.leadership",
              "$profile.organization"]
          }
        }
      }},
      {
        "$sort": {
          "score": -1, name: 1
      }
    }])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  }
  else {
    if (req.query.hardworking === ""){
      Test.find({}, null, {sort:{ "profile.hardworking": -1 }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
    }
    else if (req.query.experience === ""){
      Test.find({}, null, {sort:{ "profile.experience": -1 }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
    }
    else if (req.query.intelligence === ""){
      Test.find({}, null, {sort:{ "profile.intelligence": -1 }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
    }
    else if (req.query.organization === ""){
      Test.find({}, null, {sort:{ "profile.organization": -1 }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
    }
    else if (req.query.leadership === ""){
      Test.find({}, null, {sort:{ "profile.leadership": -1 }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
    }
  }
};