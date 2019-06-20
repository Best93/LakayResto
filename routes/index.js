var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var bodyParser = require("body-parser");
var Customer = require("../models/customer");

// " / " ===> render the home page using this route
router.get("/", function(req, res) {
  res.render("index");
});

// "/addbooking "====> route for a booking confirmation
router.post("/addbooking", function(req, res) {
  var booked_name = req.body.name;
  var guest_num = req.body.guest;
  var booked_date = req.body.date;
  var booked_time = req.body.time;
  var mobile = req.body.phone;

  // switch time to AM/PM format

  function inputTime() {
    // get the time from url and split it
    var theTime;
    theTime = booked_time.split(":");
    var hours, minutes, meridian;
    // rearrange the time array in desired order
    hours = theTime[0];
    minutes = theTime[1];
    // if time pass 12 reduce from 1-12
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    }
    // if time below 12 check
    else if (hours < 12) {
      meridian = "AM";
      // set  12 AM
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }

    // return format
    return hours + ":" + minutes + " " + meridian;
  }

  // create a date type and array of days to convert date to local time
  var d, days;
  d = new Date(booked_date);
  var month = d.getMonth();
  var option = { month: "long" }; // get the month name
  //create an array of days to display on screen
  days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  //format the date in human readable language then pass it to finalDate
  var finalDate =
    days[d.getUTCDay()] +
    " " +
    new Intl.DateTimeFormat("en-US", option).format(d) +
    " " +
    d.getUTCDate() +
    " " +
    d.getUTCFullYear();
  //pass data to customer object
  var booked_customer = {
    name: booked_name,
    guest: guest_num,
    time: inputTime(),
    date: finalDate,
    phone: mobile
  };

  console.log(booked_customer);
  //create the customer in database
  Customer.create(booked_customer, function(err, newCustomer) {
    if (err) {
      console.log(err);
    } else {
      res.render("../views/customer_booked", { newCustomer: newCustomer });
    }
  });
});

//***************
//AUTH ROUTES
//**************

// show register
router.get("/register", function(req, res) {
  res.render("register");
});

// sign up logic
router.post("/register", function(req, res) {
  //extract username and pass
  var newUser = new User({ username: req.body.username });
  //create user and add to db
  User.register(newUser, req.body.password, function(err, user) {
    //check for error
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    // authenicate users
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome " + user.username);
      res.redirect("/seeMenu");
    });
  });
});

//show login form
router.get("/login", function(req, res) {
  res.render("login");
});

//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/seeMenu",
    successFlash: "Welcome Back",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {}
);

//logout  route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged you out");
  res.redirect("/seeMenu");
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
