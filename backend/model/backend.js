const mongoose = require("mongoose");

const backendSchema = new mongoose.Schema({
  language: { type: String, default: "" },
});

const Backend = mongoose.model("Backend", backendSchema);

module.exports = Backend;
