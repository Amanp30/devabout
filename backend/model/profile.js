const mongoose = require("mongoose");
var shortid = require("shortid");

const aboutSchema = new mongoose.Schema({
  first: {
    type: String,
    default: "",
  },
  last: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
    default: shortid.generate({
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
    }),
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "male",
  },
  links: {
    type: [String],
    required: true,
    default: [],
  },
  profilephoto: { type: String, default: "default-one.png" },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Profile = mongoose.model("Profile", aboutSchema);

module.exports = Profile;
