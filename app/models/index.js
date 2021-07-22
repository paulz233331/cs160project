const dbConfig = require("../db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.employers = require("./tutorial.model.js")(mongoose);
db.tests = require("./tutorial.model2.js")(mongoose);

module.exports = db;