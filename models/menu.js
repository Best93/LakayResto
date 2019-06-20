var mongoose = require("mongoose");

//SCHEMA SET UP
var menuSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
