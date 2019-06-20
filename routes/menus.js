var express = require("express");
var router = express.Router();
var Menu = require("../models/menu");
var middleware = require("../middleware");

//Show all menu
router.get("/", function(req, res) {
  //get all foods from db
  Menu.find({}, function(err, foods) {
    if (err) {
      console.log(err);
    } else {
      res.render("menus/theMenu", { foods: foods });
    }
  });
});
//show menu on click
router.get("/:id", function(req, res) {
  //look for specific menu by id from db and show the appropriate comments
  Menu.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundFood) {
      //check for error
      if (err || !foundFood) {
        req.flash("error", "Menu not found");
        res.redirect("/seeMenu");
      }
      // render the specific food to user
      else {
        res.render("menus/show", { food: foundFood });
      }
    });
});

module.exports = router;
