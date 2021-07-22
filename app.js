var path = require('path');
//var fs = require('fs');
const fs = require('graceful-fs');
var _ = require('underscore');
var textract = require('textract');
var mime = require('mime');
var request = require("request");
var cheerio = require("cheerio");
var mongo = require('mongodb');

module.exports = {
  main
};

setTimeout(main, 2000);

var MongoClient = mongo.MongoClient;
var url = "mongodb://54.205.24.189:27017/mydb" //"mongodb://appt:appt@127.17.0.1:27017/mydb?authSource=admin"


function PreparedFile(file, raw) {
  this.path = file;
  this.mime = mime.lookup(file);
  this.ext = mime.extension(this.mime);
  this.raw = raw;
  this.name = path.basename(file);
}

var profilesWatcher = {
  inProgress: 0
};

var dictionary = {
  titles: {
    objective: ['objective', 'objectives'],
    summary: ['summary'],
    technology: ['technology', 'technologies'],
    experience: ['experience'],
    education: ['education', 'academic'],
    skills: ['skills', 'Skills & Expertise', 'technology', 'technologies'],
    languages: ['languages'],
    courses: ['courses'],
    projects: ['projects'],
    links: ['links'],
    contacts: ['contacts'],
    positions: ['positions', 'position'],
    awards: ['awards'],
    honors: ['honors'],
    additional: ['additional'],
    certification: ['certification', 'certifications'],
    interests: ['interests']
  },
  inline: {
    skype: 'skype'
  },
  regular: {
    name: [
      /([A-Z][a-z]*)(\s[A-Z][a-z]*)/
    ],
    email: [
      /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/
    ],
    phone: [
      /((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})/
    ]
  }
}

function makeRegExpFromDictionary() {
  var regularRules = {
    titles: {},
    profiles: [],
    inline: {}
  };

  _.forEach(dictionary.titles, function(titles, key) {
    regularRules.titles[key] = [];
    _.forEach(titles, function(title) {
      regularRules.titles[key].push(title.toUpperCase());
      regularRules.titles[key].push(title[0].toUpperCase() + title.substr(1, title.length));
    });
  });

  _.forEach(dictionary.profiles, function(profile) {
    var profileHandler,
      profileExpr;

    if (_.isArray(profile)) {
      if (_.isFunction(profile[1])) {
        profileHandler = profile[1];
      }
      profile = profile[0];
    }
    profileExpr = "((?:https?:\/\/)?(?:www\\.)?" + profile.replace('.', "\\.") + "[\/\\w \\.-]*)";
    if (_.isFunction(profileHandler)) {
      regularRules.profiles.push([profileExpr, profileHandler]);
    } else {
      regularRules.profiles.push(profileExpr);
    }
  });

  _.forEach(dictionary.inline, function(expr, name) {
    regularRules.inline[name] = expr + ":?[\\s]*(.*)";
  });

  return _.extend(dictionary, regularRules);
}

makeRegExpFromDictionary();

var resume = function() {
  return new Resume();
};

function Resume() {}

Resume.prototype.addKey = function(key, value) {
  value = value || '';
  value = value.trim();
  if (value) {
    if (_.has(this, key)) {
      value = this[key] + value;
    }
    this[key] = value;
  }
};

/**
 *
 * @param Resume
 * @param row
 */
var parseDictionaryInline = function(Resume, row) {
  var find;

  _.forEach(dictionary.inline, function(expression, key) {
    find = new RegExp(expression).exec(row);
    if (find) {
      Resume.addKey(key.toLowerCase(), find[1]);
    }
  });
}

/**
 *
 * @param data
 * @param Resume
 */
var parseDictionaryRegular = function(data, Resume) {
  var regularDictionary = dictionary.regular,
    find;

  _.forEach(regularDictionary, function(expressions, key) {
    _.forEach(expressions, function(expression) {
      find = new RegExp(expression).exec(data);
      if (find) {
        Resume.addKey(key.toLowerCase(), find[0]);
      }
    });
  });
}

/**
 *
 * @param Resume
 * @param rows
 * @param rowIdx
 */
var parseDictionaryTitles = function(Resume, rows, rowIdx) {
  var allTitles = _.flatten(_.toArray(dictionary.titles)).join('|'),
    searchExpression = '',
    row = rows[rowIdx],
    ruleExpression,
    isRuleFound,
    result;

  _.forEach(dictionary.titles, function(expressions, key) {
    expressions = expressions || [];
    if (row.split(' ').length <= 5) {
      _.forEach(expressions, function(expression) {
        ruleExpression = new RegExp(expression);
        isRuleFound = ruleExpression.test(row);

        if (isRuleFound) {
          allTitles = _.without(allTitles.split('|'), key).join('|');
          searchExpression = '(?:' + expression + ')((.*\n)+?)(?:' + allTitles + '|{end})';
          result = new RegExp(searchExpression, 'gm').exec(restoreTextByRows(rowIdx, rows));

          if (result) {
            Resume.addKey(key, result[1]);
          }
        }
      });
    }
  });
}

/**
 * Make text from @rowNum index of @allRows to the end of @allRows
 * @param rowNum
 * @param allRows
 * @returns {string}
 */
var restoreTextByRows = function(rowNum, allRows) {
  rowNum = rowNum - 1;
  var rows = [];

  do {
    rows.push(allRows[rowNum]);
    rowNum++;
  } while (rowNum < allRows.length);

  return rows.join("\n");
}

var parse = async function(PreparedFile, returnResume) {
  var rawFileData = PreparedFile.raw,
    Resume = new resume(),
    rows = rawFileData.split("\n"),
    row;

  // save prepared file text (for debug)
  //fs.writeFileSync('./parsed/'+PreparedFile.name + '.txt', rawFileData);

  // 1 parse regulars
  await parseDictionaryRegular(rawFileData, Resume);

  for (var i = 0; i < rows.length; i++) {
    row = rows[i];

    // 3 parse titles
    await parseDictionaryTitles(Resume, rows, i);
    await parseDictionaryInline(Resume, row);
  }

  if (_.isFunction(returnResume)) {
    // wait until download and handle internet profile
    var checkTimer = setInterval(async function() {
      if (profilesWatcher.inProgress === 0) {
        await returnResume(Resume);
        await clearInterval(checkTimer);
      }
    }, 200);
  } else {
    return console.error('returnResume should be a function');
  }
}

/**
 *
 * @param Resume
 */
PreparedFile.prototype.addResume = function(Resume) {
  this.resume = Resume;
};

PreparedFile.prototype.saveResume = async function(filePath, savedResume) {
  filePath = filePath || __dirname;

  if (!_.isFunction(savedResume)) {
    return console.error('savedResume should be a function');
  }

  if (fs.statSync(filePath).isDirectory() && this.resume) {
    await fs.writeFile(filePath + '/' + path.parse(this.name).name + '.json', JSON.stringify(this.resume), savedResume);
  }
};



var processFile = async function(file, afterProcessing) {
  await extractText(file, async function(PreparedFile) {
    if (_.isFunction(afterProcessing)) {
      await afterProcessing(PreparedFile);
    } else {
      return console.error('afterProcessing should be a function');
    }
  });
}

var extractText = async function(file, afterExtract) {
  await textract(file, {
    preserveLineBreaks: true
  }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    if (_.isFunction(afterExtract)) {
      var rows,
        clearRow,
        clearRows = [];
        if ( data )
            rows = data.split("\n");
       if (rows )
      for (var i = 0; i < rows.length; i++) {
        clearRow = rows[i].replace(/\r?\n|\r|\t|\n/g, '').trim();
        if (clearRow) {
          clearRows.push(clearRow);
        }
      }
      data = clearRows.join("\n") + "\n{end}";

      var File = new PreparedFile(file, data.replace(/^\s/gm, ''));
      afterExtract(File);
    } else {
      return console.error('afterExtract should be a function');
    }
  });
}

function main() {


  return new Promise( () => {


  var getFileNames = function(filePaths) {
    return filePaths.map(function(file) {
      return path.basename(file);
    }).join(', ');
  };

  var pack = __dirname + '/public';
  var self = this;

  if (!fs.existsSync(pack)) {
    return console.error('no resume directory');
  }


MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {

  fs.readdir(pack, function(err, files) {
      files = files.map(function(file) {
        return pack + '/' + file;
      });

      var savedFiles = 0;

      if (err) {
        return this.explainError(err);
      }

      if (!files.length) {
        return console.error('No resumes');
      }

      var preparedFile = function(PreparedFile) {
        var getResume = function(Resume) {
            PreparedFile.addResume(Resume);
            var onSaved = function(err) {
                              if (err) {
                                return this.explainError(err);
                              }
                              savedFiles += 1;
                          };
            if (!_.isFunction(onSaved)) {
              return console.error('onSaved should be a function');
            }

            //insert the json file to the database.
            //console.log(PreparedFile.resume);

              if (err) throw err;
              var dbo = db.db("mydb");

                //insert myobj if its not already there.
                var myobj = PreparedFile.resume;

                //console.log(resm.toLowerCase());
                var profile = { hardworking:0, experience:0, intelligence: 0, leadership:0, organization:0};
                var hardworking = ["challeng", "participat", "prepar", "attend", "adapt", "prepare",
                                "help", "act", "associat", "support", "conduct", "energetic", "collab","hardwork", "hard work"
                                   ];
                var intelligence = ["intelligen", "knowledge", "understanding", "research",
                                    "interesting", "learn", "think", "creativity", "creative",
                                    "skill", "grow", "development", "review", "explore"];
                var leadership = [ "leader", "motivation", "commit", "responsib", "discipline", "determin",
                        "communicat", "respect", "winner", "succe", "dedicat", "willing", "achiev", "positive"];
                var organization = ["organiz", "coordinat", "maintain", "writing", "write", "generat", "perform",
                 "handl", "manag", "monitor", "train", "flexib", "format", "submi"];

                hardworking.forEach(function (item, index){
                    for( var key in myobj){
//                        console.log(myobj[key].toString());
                        var str = myobj[key].toString()
                        if (str.indexOf(item) !== -1) {
                            profile.hardworking += 1;
                            continue;
                        }
                    }
                })

                for( var key in myobj){
                    var str = myobj[key].toString()
                    if (str.indexOf("year") !== -1){
                        profile.experience += 12;
                    }
                    if (str.indexOf("month") !== -1){
                        profile.experience += 1;
                    }
                }

                intelligence.forEach(function (item, index){
                    for( var key in myobj){
                        var str = myobj[key].toString()
                        if (str.indexOf(item) !== -1) {
                            profile.intelligence += 1;
                            continue;
                        }
                    }
                })
                leadership.forEach(function (item, index){
                    for( var key in myobj){
                        var str = myobj[key].toString()
                        if (str.indexOf(item) !== -1) {
                            profile.leadership += 1;
                            continue;
                        }
                    }
                })
                organization.forEach(function (item, index){
                    for( var key in myobj){
                        var str = myobj[key].toString()
                        if (str.indexOf(item) !== -1) {
                            profile.organization += 1;
                            continue;
                        }
                    }
                })
        //console.log({profile: profile});

                PreparedFile.resume.profile = profile;
                PreparedFile.saveResume(__dirname + '/compiled', onSaved);

                dbo.collection("test").findOne(myobj, function(err, result) {
                    if (err) throw err;
                    if (result == null){
                        dbo.collection("test").insertOne(myobj, function(err, res) {
                            if (err) throw err;
                            //console.log(profile);
                            var newValues = { $set: {hired: false, offered: false, interviewed: false, position : "", otherOffer : false, profile: profile } };
                            dbo.collection("test").updateOne({_id: myobj._id}, newValues , function(err, res) {
                                if (err) throw err;
                                //console.log("1 document inserted");
                                //console.log(myobj._id);
                                db.close();
                            });
                          });
                    }
                    else{
                        var newValues = { $set: {hired: false, offered: false, interviewed: false, position : "", otherOffer : false, profile: profile } };
                        dbo.collection("test").updateOne({_id: myobj._id}, newValues , function(err, res) {
                            if (err) throw err;
                            db.close();
                        });
                    }

            }); //end findOne
        };

        parse(PreparedFile, function(Resume) {
          if (_.isFunction(getResume)) {
            getResume(Resume);
          } else {
            console.error('getResume should be a function');
          }
        });
      };


    var type;
    _.forEach(files, async function(file) {
        processFile(file, function(PreparedFile) {
          if (_.isFunction(preparedFile)) {
            preparedFile(PreparedFile);
          } else {
            return console.error('preparedFile should be a function');
          }
        }, type);
    });

  });//end readdir
 }); //end connect

    }); //end promise
} //main