const mongoose = require("mongoose");

const frontendSchema = new mongoose.Schema({
  language: { type: String, default: "" },
});

const Frontend = mongoose.model("Frontend", frontendSchema);

module.exports = Frontend;
