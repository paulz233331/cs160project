var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var textract = require('textract');
var mime = require('mime');
var request = require("request");
var cheerio = require("cheerio");

module.exports = {main, iHaveCVPack, extractText};

setTimeout(main, 2000);

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

var dictionary =  {
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
    profileExpr = "((?:https?:\/\/)?(?:www\\.)?"+profile.replace('.', "\\.")+"[\/\\w \\.-]*)";
    if (_.isFunction(profileHandler)) {
      regularRules.profiles.push([profileExpr, profileHandler]);
    } else {
      regularRules.profiles.push(profileExpr);
    }
  });

  _.forEach(dictionary.inline, function(expr, name) {
    regularRules.inline[name] = expr+":?[\\s]*(.*)";
  });

  return _.extend(dictionary, regularRules);
}

makeRegExpFromDictionary();

var resume = function() {
  return new Resume();
};

function Resume() {
}

Resume.prototype.addKey = function(key, value) {
  value = value || '';
  value = value.trim();
  // reject falsy values
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
              searchExpression = '(?:' + expression + ')((.*\n)+?)(?:'+allTitles+'|{end})';
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
      } while(rowNum < allRows.length);

      return rows.join("\n");
    }

var parse = function (PreparedFile, cbReturnResume) {
      var rawFileData = PreparedFile.raw,
        Resume = new resume(),
        rows = rawFileData.split("\n"),
        row;

      // save prepared file text (for debug)
      //fs.writeFileSync('./parsed/'+PreparedFile.name + '.txt', rawFileData);

      // 1 parse regulars
      parseDictionaryRegular(rawFileData, Resume);

      for (var i = 0; i < rows.length; i++) {
        row = rows[i];

        // 3 parse titles
        parseDictionaryTitles(Resume, rows, i);
        parseDictionaryInline(Resume, row);
      }

      if (_.isFunction(cbReturnResume)) {
        // wait until download and handle internet profile
        var checkTimer = setInterval(function() {
          if (profilesWatcher.inProgress === 0) {
            cbReturnResume(Resume);
            clearInterval(checkTimer);
          }
        }, 200);
      } else {
        return console.error('cbReturnResume should be a function');
      }
}

var iHaveCVPack = function(path, cbAcceptedFiles) {
  var self = this;

  if (!_.isFunction(cbAcceptedFiles)) {
    return console.error('cbAcceptedFiles should be a function');
  }

    if (!fs.existsSync(path)) {
        return cbAcceptedFiles.call(this, 'no one wants to work with us :(');
    }
  fs.readdir(path, function(err, files) {
    files = files.map(function(file) {
      return path + '/' + file;
    });
    cbAcceptedFiles.call(self, err, files);
  });
}

var nothingToDo = function() {
      return this.say('I haven\'t work! Should I have a date today?');
    };

var cbAcceptedFiles = function (err, files) {
    var savedFiles = 0;

    if (err) {
      return this.explainError(err);
    }
    if (!files.length) {
      return nothingToDo();
    }

    willHelpWithPleasure(files, function (PreparedFile) {
      workingHardOn(PreparedFile, function (Resume) {
        storeResume(PreparedFile, Resume, __dirname + '/compiled', function (err) {
          if (err) {
            return this.explainError(err);
          }
          savedFiles += 1;
        })
      });
    });
}

/**
 *
 * @param Resume
 */
PreparedFile.prototype.addResume = function(Resume) {
  this.resume = Resume;
};

PreparedFile.prototype.saveResume = function(filePath, cbSavedResume) {
  filePath = filePath || __dirname;

  if (!_.isFunction(cbSavedResume)) {
    return console.error('cbSavedResume should be a function');
  }

  if (fs.statSync(filePath).isDirectory() && this.resume) {
    fs.writeFile(filePath + '/' + path.parse(this.name).name + '.json', JSON.stringify(this.resume), cbSavedResume);
  }
};

var storeResume = function(PreparedFile, Resume, path, cbOnSaved) {
      PreparedFile.addResume(Resume);

      if (!_.isFunction(cbOnSaved)) {
        return console.error('cbOnSaved should be a function');
      }
      PreparedFile.saveResume(path, cbOnSaved);
};

var processFile = function (file, cbAfterProcessing) {
      extractText(file, function(PreparedFile) {
        if (_.isFunction(cbAfterProcessing)) {
          cbAfterProcessing(PreparedFile);
        } else {
          return console.error('cbAfterProcessing should be a function');
        }
      } );
}

var extractText = function(file, cbAfterExtract) {
      textract(file, {preserveLineBreaks: true}, async function(err, data) {
        if (err) {
          return console.log(err);
        }
        if (_.isFunction(cbAfterExtract)) {
          var rows,
              clearRow,
              clearRows = [];
          rows = data.split("\n");
          for (var i = 0; i < rows.length; i++) {
              clearRow = rows[i].replace(/\r?\n|\r|\t|\n/g, '').trim();
              if (clearRow) {
                clearRows.push(clearRow);
              }
          }
          data = clearRows.join("\n") + "\n{end}";

          var File = new PreparedFile(file, data.replace(/^\s/gm, ''));
          cbAfterExtract(File);
        } else {
          return console.error('cbAfterExtract should be a function');
        }
      });
}

var willHelpWithPleasure = function(files, cbPreparedFile) {
    var type;
    _.forEach(files, function(file) {
      processFile(file, function (PreparedFile) {
        if (_.isFunction(cbPreparedFile)) {
          cbPreparedFile(PreparedFile);
        } else {
          return console.error('cbPreparedFile should be a function');
        }
      }, type);
    });
};

var workingHardOn = function(PreparedFile, cbGetResume) {
  parse(PreparedFile, function(Resume) {
    if (_.isFunction(cbGetResume)) {
      cbGetResume(Resume);
    } else {
      console.error('cbGetResume should be a function');
    }
  });
};

function main() {
  var getFileNames = function (filePaths) {
    return filePaths.map(function (file) {
      return path.basename(file);
    }).join(', ');
  };

  var pack = __dirname + '/public';
  iHaveCVPack(pack, cbAcceptedFiles);
}