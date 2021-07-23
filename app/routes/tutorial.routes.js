module.exports = app => {
  const employers = require("../controllers/tutorial.controller.js");
  const tests = require("../controllers/tutorial.controller2.js");

  var router = require("express").Router();

  router.post("/employers", employers.create);

  router.post("/test", tests.create);

  router.get("/employers", employers.findAll);

  router.get("/", employers.findAll);

  router.get("/test", tests.findAll);

  router.get("/names", tests.findAllNames);

  router.get("/emails", tests.findAllEmails);

  router.get("/scores", tests.findByScores);
  // Retrieve all published Tutorials
  //router.get("/published", employers.findAllCondition);

  // Retrieve a single Tutorial with id
  router.get("/:id", employers.findOne);

  //router.put("/:id", employers.update);

  router.put("/test", tests.update);

  // Delete a Tutorial with id
  //router.delete("/:id", employers.delete);

  // Create a new Tutorial
  //router.delete("/", employers.deleteAll);

  app.use('/api', router);
};