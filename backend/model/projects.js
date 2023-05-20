const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  projectname: String,
  platforms: { type: [String], default: [] },
  videourl: { type: String, default: "" },
  projectlogo: { type: String, default: "" },
  imageone: { type: String, default: "" },
  imagetwo: { type: String, default: "" },
  imagethree: { type: String, default: "" },
  tagline: { type: String, default: "" },
  problems: { type: String, default: "" },
  challenges: { type: String, default: "" },
  technology: { type: [String], default: [""] },
  links: { type: [String], default: [""] },
  status: { type: String, default: "unpublished" },
  slug: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

/* projectsSchema.index({ slug: 1 }, { unique: true }); */

const Project = mongoose.model("Project", projectsSchema);

module.exports = Project;
