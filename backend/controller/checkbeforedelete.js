const fs = require("fs");

exports.checkbeforedelete = function ({ path }) {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(path, (errunlink) =>
        console.log("Error deleting " + path + errunlink)
      );
      console.log(path);
    }
  });
};
