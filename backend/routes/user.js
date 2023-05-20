const express = require("express");
const { requireSignin } = require("../controller/auth");
const router = express.Router();
const { authorsetting, updateauthor } = require("../controller/author");
const { profileUpload } = require("../middleware/profileupload");

router.get("/user/authorfind/:id", requireSignin, authorsetting);
//test
router.post(
  "/user/updateauthor/:id",
  requireSignin,
  profileUpload.fields([{ name: "profilephoto", maxCount: 4 }]),
  updateauthor
); //working now

router.get("/magic", (req, res) => {
  res.json({
    name: "AMan",
    username: "@amanpareek",
    youtube: "https://youtube.com",
  });
});

module.exports = router;
