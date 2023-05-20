const Project = require("../model/projects");
const Profile = require("../model/profile");
const { mongoslug } = require("mongoslug");
const mongofiles = require("mongofiles");
const { checkbeforedelete } = require("checkbeforedelete");
const fs = require("fs");

exports.start = async (req, res) => {
  var { projectname, userid } = req.params;
  // getting name and bio from user
  var slug = await mongoslug({ title: projectname, modelname: Project });

  if (slug) {
    let newProject = new Project({
      projectname: projectname,
      postedBy: userid,
      slug: slug,
    });
    newProject.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        console.log(data.slug);
        res.json(data);
      }
    });
  }
};

exports.getproject = (req, res) => {
  var { slug } = req.params;
  Project.findOne({
    slug: slug,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    console.log(data);
    res.json(data);
  });
};

exports.updateProjects = async (req, res) => {
  const {
    challenges,
    videourl,
    problems,
    projectname,
    tagline,
    technology,
    links,
    platforms,
  } = req.body;
  var publishstatus = "published";

  var dataobject = {
    challenges,
    problems,
    projectname,
    tagline,
    technology,
    links,
    videourl,
    platforms,
    status: publishstatus,
  };

  var oldData;

  Project.findById({ _id: req.params.id })
    .select("projectname")
    .select("projectlogo")
    .select("imageone")
    .select("imagetwo")
    .select("imagethree")
    .exec(async (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      oldData = data;

      if (oldData.projectname !== projectname) {
        console.log("new project name");
        var slug = await mongoslug({ title: projectname, modelname: Project });
        dataobject.slug = slug;
      }

      var logo, imgone, imgtwo, imgthree;

      var deleteArray = [];
      if (req.files && typeof req.files === "object" && oldData) {
        var hasFiles = Object.getOwnPropertyNames(req.files).length; //checking that user is sending files
        if (hasFiles > 0) {
          if (typeof req.files.projectlogo === "object") {
            logo =
              typeof req.files.projectlogo === "object"
                ? mongofiles.onefile(
                    req.files.projectlogo,
                    `projectlogo`,
                    "filename"
                  )
                : null;

            logo ? (dataobject.projectlogo = logo) : null;
            deleteArray.push(oldData.projectlogo);
          }

          if (typeof req.files.projectimgone === "object") {
            imgone =
              typeof req.files.projectimgone === "object"
                ? mongofiles.onefile(
                    req.files.projectimgone,
                    `projectimgone`,
                    "filename"
                  )
                : null;

            imgone ? (dataobject.imageone = imgone) : null;
            deleteArray.push(oldData.imageone);
          }
        }
        if (typeof req.files.projectimgtwo === "object") {
          imgtwo =
            typeof req.files.projectimgtwo === "object"
              ? mongofiles.onefile(
                  req.files.projectimgtwo,
                  `projectimgtwo`,
                  "filename"
                )
              : null;

          imgtwo ? (dataobject.imagetwo = imgtwo) : null;
          deleteArray.push(oldData.imagetwo);
        }

        if (typeof req.files.projectimgthree === "object") {
          imgthree =
            typeof req.files.projectimgthree === "object"
              ? mongofiles.onefile(
                  req.files.projectimgthree,
                  `projectimgthree`,
                  "filename"
                )
              : null;

          imgthree ? (dataobject.imagethree = imgthree) : null;
          deleteArray.push(oldData.imagethree);
        }
      }

      var id = req.params.id;
      /* Getting id from url */
      Project.findByIdAndUpdate({ _id: id }, dataobject).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }

        deleteArray.forEach((element, index) => {
          var checkinglogo = element.startsWith("logo ");
          if (checkinglogo && element !== "") {
            var thepath = `uploads/logo/${element}`;
            var truefalse = fs.existsSync(thepath, fs.constants.F_OK, (err) => {
              if (err) return res.json({ pserror: "Unable to delete Image" });
            });
            if (truefalse) {
              checkbeforedelete({ path: thepath });
            }
          } else {
            if (element !== "") {
              var thepath = `uploads/projectimg/${element}`;
              var truefalse = fs.existsSync(
                thepath,
                fs.constants.F_OK,
                (err) => {
                  if (err)
                    return res.json({ pserror: "Unable to delete Image" });
                }
              );
              if (truefalse) {
                checkbeforedelete({ path: thepath });
              }
            }
          }
        });
        res.json({ success: "Data Saved" });
      });
    });
};

exports.showProjects = (req, res) => {
  const userid = req.params.userid;
  Project.find({ postedBy: userid })
    .select("status")
    .select("projectname")
    .select("slug")
    .select("projectlogo")
    .select("postedBy")
    .exec((err, result) => {
      if (err) return console.error(err);
      console.log(result);
      res.json(result);
    });
};

exports.deleteProject = (req, res) => {
  var id = req.params.id;

  Project.findById({ _id: id }, (err, project) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    var photos = [];
    // Get the list of photos associated with the project
    photos.push(project.projectlogo);
    photos.push(project.imageone);
    photos.push(project.imagetwo);
    photos.push(project.imagethree);
    console.log(photos);
    photos.forEach((element, index) => {
      var checkinglogo = element.startsWith("logo ");
      if (checkinglogo && element !== "") {
        var thepath = `uploads/logo/${element}`;
        var truefalse = fs.existsSync(thepath, fs.constants.F_OK, (err) => {
          if (err) return res.json({ pserror: "Unable to delete Image" });
        });
        if (truefalse) {
          checkbeforedelete({ path: thepath });
        }
      } else {
        if (element !== "") {
          var thepath = `uploads/projectimg/${element}`;
          var truefalse = fs.existsSync(thepath, fs.constants.F_OK, (err) => {
            if (err) return res.json({ pserror: "Unable to delete Image" });
          });
          if (truefalse) {
            checkbeforedelete({ path: thepath });
          }
        }
      }
    });
    /* Getting id from url */
    Project.findByIdAndDelete({ _id: id }).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
  });
};

exports.oneProject = (req, res) => {
  const projectslug = req.params.project;

  Project.findOne({ slug: projectslug }).exec((err, project) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    Profile.findOne({
      postedBy: project.postedBy,
    })
      .select("first")
      .select("last")
      .select("profilephoto")
      .select("username")
      .exec((err, profile) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }

        console.log(project + profile);
        res.json({ project, profile });
      });
  });
};
