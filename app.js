var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
  Menu = require("./models/menu"),
  Customer = require("./models/customer"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seed");

//require routes
var commentsRoutes = require("./routes/comments"),
  menuRoutes = require("./routes/menus"),
  indexRoutes = require("./routes/index");

//set up port
var port = process.env.PORT || 3000;

//connect to mongodb
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Avoid deprecation warnings
mongoose.set("useFindAndModify", false);

// tell express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// tell express to serve the public folder
app.use(express.static(__dirname + "/public"));

// tell express to method override for restful route
app.use(methodOverride("_method"));

// tell express to use flash for
app.use(flash());

//seedDB(); // seed db

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Web dev is wonderful!",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//make currentUser available in every templates and routes
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// simplify routes
app.use("/", indexRoutes);
app.use("/seeMenu", menuRoutes);
app.use("/seeMenu/:id/comments", commentsRoutes);

//tell express that we using ejs file therefore no need to ejs when rendering templates
app.set("view engine", "ejs");

// check for server port
app.listen(port, function() {
  console.log("Server just started");
});
