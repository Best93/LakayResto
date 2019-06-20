var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//SCHEMA SET UP

var customerSchema = new mongoose.Schema({
  name: String,
  guest: Number,
  time: String,
  date: String,
  phone: String
});

//Create a customer model
var Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
