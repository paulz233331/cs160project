module.exports = app => {
  const employers = require("../controllers/tutorial.controller.js");
  const tests = require("../controllers/tutorial.controller2.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", employers.create);

  // Retrieve all Tutorials
  router.get("/", employers.findAll);

  // Retrieve all Tutorials
  router.get("/test", tests.findAll);

  // Retrieve all published Tutorials
  router.get("/published", employers.findAllCondition);

  // Retrieve a single Tutorial with id
  router.get("/:id", employers.findOne);

  // Update a Tutorial with id
  router.put("/:id", employers.update);

  // Delete a Tutorial with id
  router.delete("/:id", employers.delete);

  // Create a new Tutorial
  router.delete("/", employers.deleteAll);

  app.use('/api/employers', router);
};