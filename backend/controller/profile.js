const Profile = require("../model/profile");
const Project = require("../model/projects");
const { capitalFirst } = require("capitalfirst");
const mongofiles = require("mongofiles");
const { checkbeforedelete } = require("checkbeforedelete");
const fs = require("fs");

exports.getusernamefrontend = (req, res) => {
  var requsername = req.params.username;

  var withoutattherate = requsername.substring(1);
  var sendData = [];

  if (requsername.charAt(0) === "@") {
    Profile.findOne({
      username: withoutattherate,
    })
      .select("username")
      .select("first")
      .select("last")
      .select("bio")
      .select("links")
      .select("profilephoto")
      .select("postedBy")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }

        var thepostedBy = data.postedBy;
        console.log(thepostedBy);
        Project.find({ postedBy: thepostedBy, status: "published" })
          .select("projectname")
          .select("tagline")
          .select("slug")
          .exec((err, project) => {
            console.log(data + project);
            delete data.postedBy;
            delete data._id;
            sendData.push({ user: data, project });

            res.json(sendData);
          });
      });

    /* this is else part of @  */
  } else {
    return res.json({ attherateerror: "username without @" });
  }
};

exports.aboutsimple = (req, res) => {
  Profile.findOne({
    postedBy: req.params.id,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.updateaboutsimple = (req, res) => {
  var { first, last, bio, gender } = req.body;

  if (gender !== "male" && gender !== "female") {
    return res.json({
      error: "Error: Gender must be either 'male' or 'female'",
    });
  }

  var id = req.params.id;
  /* Getting id from url */
  Profile.findByIdAndUpdate(
    { _id: id },
    { first: capitalFirst(first), last: capitalFirst(last), gender, bio }
  ).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.updatelinkprofiles = (req, res) => {
  var { links } = req.body;

  console.log(links);
  var id = req.params.id;
  /* Getting id from url */
  Profile.findByIdAndUpdate({ _id: id }, { links }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.updateusername = async (req, res) => {
  var profilephoto;

  var oldProfile;
  Profile.findById({ _id: req.params.id })
    .select("profilephoto")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      oldProfile = data.profilephoto;
    });

  if (req.files && typeof req.files === "object") {
    var hasFiles = Object.getOwnPropertyNames(req.files).length; //checking that user is sending files
    if (hasFiles > 0) {
      profilephoto =
        typeof req.files.profilephoto === "object"
          ? mongofiles.onefile(req.files.profilephoto, profilephoto, "filename")
          : oldProfile;
    }
  }

  if (req.body.username !== "") {
    const user = await Profile.findOne({ username: req.body.username });
    const you = await Profile.findOne({
      _id: req.params.id,
    });

    if (you) {
      if (!user || you.username === req.body.username) {
        var id = req.params.id;
        Profile.findByIdAndUpdate(
          { _id: id },
          { username: req.body.username, profilephoto: profilephoto }
        ).exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else {
            var newphoto = `uploads/profilephoto/${data.profilephoto}`;
            fs.access(newphoto, fs.constants.F_OK, (err) => {
              if (err)
                return res.json({ pserror: "File not uploaded successfully" });
              if (data.profilephoto && oldProfile) {
                if (typeof profilephoto === "string") {
                  if (oldProfile === "default-one.png") {
                    return res.json({ data: "Data saved successfully" });
                  } else {
                    var thepath = `uploads/profilephoto/${oldProfile}`;
                    waitingdelete = checkbeforedelete({ path: thepath });
                    return res.json({
                      data: "Profile photo uploaded successfully",
                    });
                  }
                } else {
                  return res.json({ data: "you saved nothing" });
                }
              }
            });
          }
        });
      } else {
        if (typeof profilephoto === "string" || req.body.username === "") {
          var removeunwanted = `uploads/profilephoto/${profilephoto}`;
          console.log(removeunwanted);
          fs.access(removeunwanted, fs.constants.F_OK, (err) => {
            if (err) return res.json({ pserror: "Username Unavailable" });
            waitingdelete = checkbeforedelete({ path: removeunwanted });
            return res.json({ pserror: "Username unavailable" });
          });
        } else {
          return res.json({ pserror: "Username unavailable" });
        }
      }
    }
  } else {
    var removeunwanted = `uploads/profilephoto/${profilephoto}`;
    console.log(removeunwanted);
    fs.access(removeunwanted, fs.constants.F_OK, (err) => {
      if (err) return res.json({ pserror: "Username Unavailable" });
      waitingdelete = checkbeforedelete({ path: removeunwanted });
      return res.json({ pserror: "Username can't be empty" });
    });
  }
};

exports.deleteProfilePhoto = (req, res) => {
  var delurl = req.params.profilepicurl;
  var id = req.params.id;
  var checkexist = `uploads/profilephoto/${delurl}`;
  var waitingdelete;
  fs.access(checkexist, fs.constants.F_OK, (err) => {
    if (err) {
      return res.json({ pserror: "Unavailable to delete Profile photo" });
    }
    waitingdelete = checkbeforedelete({ path: checkexist });
  });

  if (typeof waitingdelete === "undefined") {
    Profile.findByIdAndUpdate(
      { _id: id },
      {
        profilephoto: "default-one.png",
      }
    ).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({ psmessage: "Photo deleted successfully" });
    });
  } else {
    return res.json({ pserror: "Unable to delete photo" });
  }
};

exports.deleteProfilePhoto2 = async (req, res) => {
  try {
    const delurl = req.params.profilepicurl;
    const id = req.params.id;
    const checkexist = `uploads/profilephoto/${delurl}`;
    const fileExists = await new Promise((resolve) => {
      fs.access(checkexist, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    if (!fileExists) {
      return res.json({ pserror: "Unable to delete profile photo" });
    }
    const waitingdelete = checkbeforedelete({ path: checkexist });
    if (waitingdelete) {
      await Profile.findByIdAndUpdate(
        { _id: id },
        {
          profilephoto: "default-one.png",
        }
      );
      return res.json({ psmessage: "Photo deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
