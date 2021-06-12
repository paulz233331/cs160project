var path = require('path');
var SomeHR = require('./src/SomeHR')();
require('colors');

setTimeout(main, 2000);

function main() {
  var getFileNames = function (filePaths) {
    return filePaths.map(function (file) {
      return path.basename(file);
    }).join(', ');
  };

  var pack = __dirname + '/public';
  SomeHR.iHaveCVPack(pack, function (err, files) {
    var Iam = this,
      ParseBoy,
      savedFiles = 0;

    if (err) {
      return Iam.explainError(err);
    }
    if (!files.length) {
      return Iam.nothingToDo();
    }

    /** @type {ParseBoy} */
    ParseBoy = Iam.needSomeoneToSortCV();

    ParseBoy.willHelpWithPleasure(files, function (PreparedFile) {
      ParseBoy.workingHardOn(PreparedFile, function (Resume) {
        ParseBoy.storeResume(PreparedFile, Resume, __dirname + '/compiled', function (err) {
          if (err) {
            return ParseBoy.explainError(err);
          }
          savedFiles += 1;
        })
      });
    });
  });
}