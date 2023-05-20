const express = require("express");
const { requireSignin } = require("../controller/auth");
const router = express.Router();
const {
  aboutsimple,
  updateaboutsimple,
  updatelinkprofiles,
  updateusername,
  getusernamefrontend,
  deleteProfilePhoto,
  deleteProfilePhoto2,
} = require("../controller/profile");
const { profileUpload } = require("../middleware/profileupload");

router.get("/getusername/:username", getusernamefrontend);

router.post(
  "/deletephoto/:profilepicurl/:id",
  requireSignin,
  deleteProfilePhoto
);
router.get("/aboutsimple/:id", requireSignin, aboutsimple);
router.post("/updateaboutsimple/:id", requireSignin, updateaboutsimple);
router.post("/updatelinkprofiles/:id", requireSignin, updatelinkprofiles);
router.post(
  "/updateusername/:id/:postedby",
  requireSignin,
  profileUpload.fields([{ name: "profilephoto", maxCount: 2 }]),
  updateusername
);

module.exports = router;
