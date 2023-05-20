const express = require("express");
const { requireSignin } = require("../controller/auth");
const {
  start,
  getproject,
  updateProjects,
  showProjects,
  deleteProject,
  oneProject,
} = require("../controller/projects");
const router = express.Router();
const { projectLogo } = require("../middleware/projectlogo");

router.get("/projects/delete/:id", requireSignin, deleteProject);
router.get("/projects/allprojects/:userid", requireSignin, showProjects);
router.get("/projects/:projectname/:userid", requireSignin, start);
router.get("/projects/:slug", getproject);
router.get("/projectsone/:project", oneProject);

router.post(
  "/projects/update/:id",
  requireSignin,
  projectLogo.fields([
    { name: "projectlogo", maxCount: 1 },
    { name: "projectimgone", maxCount: 1 },
    { name: "projectimgtwo", maxCount: 1 },
    { name: "projectimgthree", maxCount: 1 },
  ]),

  updateProjects
);

module.exports = router;
