const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  items: {
    type: Array,
    require: false,
  },
});

module.exports = mongoose.model("Category", categorySchema);
