const express = require("express");
const router = express.Router();
const {
  add,
  signin,
  signout,
  requireSignin,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");
const { runValidation } = require("../validators");
const {
  userSignupvalidator,
  userSigninvalidator,
} = require("../validators/auth");

router.get("/user/signout", signout);
router.post("/user/forgotpassword", forgotPassword);
router.post("/user/reset/:link", resetPassword);
//test
router.get("/user/secret", requireSignin, (req, res) => {
  res.json({ message: "you have access of this page" });
});

router.post("/user/add", userSignupvalidator, runValidation, add);
router.post("/user/signin", userSigninvalidator, runValidation, signin);

module.exports = router;
