const multer = require("multer");
const { fromtorandom } = require("fromtorandom");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "projectlogo") {
      cb(null, "uploads/logo");
    } else {
      cb(null, "uploads/projectimg");
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "projectlogo") {
      cb(null, "logo " + Date.now() + " - " + file.originalname);
    } else {
      cb(null, Date.now() + fromtorandom(5, 81469) + " - " + file.originalname);
    }
  },
});

const fileFilter = (req, file, cb) => {
  /*   if (file.size > 1e6) {
    return cb(new Error("File size must be below 1mb"), false);
  } */
  if (!file.mimetype.startsWith("image")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

exports.projectLogo = multer({
  storage: storage,
  fileFilter: fileFilter,
});
