const User = require("../model/user");
const mongofiles = require("mongofiles");
const { checkbeforedelete } = require("checkbeforedelete");

exports.authorsetting = (req, res) => {
  var userid = req.params.id;
  User.find({
    _id: userid,
  })
    .select("username")
    .select("name")
    .select("facebook")
    .select("tiktok")
    .select("instagram")
    .select("youtube")
    .select("tiktok")
    .select("twitter")
    .select("profilephoto")
    .select("tradingview")
    .select("bio")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.updateauthor = (req, res, next) => {
  var {
    username,
    name,
    bio,
    facebook,
    instagram,
    twitter,
    youtube,
    tradingview,
    tiktok,
    profilephoto,
  } = req.body;

  console.log(profilephoto);

  let author = {
    username: username,
    name: name,
    bio: bio,
    facebook: facebook,
    instagram: instagram,
    twitter: twitter,
    youtube: youtube,
    tradingview: tradingview,
    tiktok: tiktok,
  };
  var oldProfile;
  var id = req.params.id;
  /* Getting id from url */
  User.findById({ _id: id })
    .select("profilephoto")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      oldProfile = data.profilephoto;
    });

  var hasFiles = Object.getOwnPropertyNames(req.files).length; //checking that user is sending files
  if (hasFiles > 0) {
    profilephoto =
      typeof req.files.profilephoto === "object"
        ? mongofiles.onefile(req.files.profilephoto, profilephoto, "filename")
        : oldProfile;

    author.profilephoto = profilephoto; // obj.name = "John";
  }

  var id = req.params.id;
  /* Getting id from url */
  User.findByIdAndUpdate({ _id: id }, author).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    // Check if the old profile photo is a string before deleting it
    if (typeof profilephoto === "string") {
      var thepath = `uploads/profilephoto/${oldProfile}`;
      checkbeforedelete({ path: thepath });
    }

    res.json(data);
  });
};
