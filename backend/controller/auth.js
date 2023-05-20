const User = require("../model/user");
const Jwtoken = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");
const Profile = require("../model/profile");
const _ = require("lodash");
// sendgrid
const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.add = async (req, res) => {
  var { password, email } = req.body;
  email = email.toLowerCase();
  /* getting name and bio from user */
  var CheckUserEmail = await User.findOne({ email: email });
  if (CheckUserEmail) {
    res.json({ pserror: "Email already exist" });
  } else {
    let newUser = new User({
      password,
      email,
    });
    newUser.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        let newProfile = new Profile({ postedBy: data._id });
        newProfile.save((err, data) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else {
            res.json(data);
            console.log(data);
          }
        });
        /* var userid = data._id;
        console.log(typeof userid);
        res.redirect(`/api/setautonew/${userid}`); */
        //res.json({ psmessage: "Your account created successfully" });
      }
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with this email does not exist! Please signup",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password does not match",
      });
    }

    const token = Jwtoken.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email } = user;
    return res.json({ token, user: _id, username, name, email });
    /* res.json(data); */
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sighout Success" });
};

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist",
      });
    }

    const token = Jwtoken.sign(
      { _id: user._id },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    // email
    const emailData = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: `Password reset link`,
      html: `
            <p>Please use the following link to reset your password:</p>
            <p>${process.env.CLIENT_URL}/auth/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `,
      /*  text: "and easy to do anywhere, even with Node.js", */
    };
    console.log(emailData);
    // populating the db > user > resetPasswordLink
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        sgMail
          .send(emailData)
          .then((response) => {
            return res.json({ success: "Email Send successfully" });
          })
          .catch((error) => {
            console.error(error.response.body);
          });
        return res.json({ success: "Email Send successfully" });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  var resetPasswordLink = req.params.link;
  const { password } = req.body;

  if (resetPasswordLink) {
    Jwtoken.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired link. Try again",
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: "Something went wrong. Try later",
            });
          }
          const updatedFields = {
            password: password,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};
