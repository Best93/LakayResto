var express = require("express");
var router = express.Router({ mergeParams: true });
var Menu = require("../models/menu");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
  //find menu by id
  Menu.findById(req.params.id, function(err, food) {
    if (err) {
      console.log(err);
    }
    // show form for specific food on menu
    else {
      res.render("comments/new", { food: food });
    }
  });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
  //lookup menu using id
  Menu.findById(req.params.id, function(err, food) {
    if (err) {
      console.log(err);
    } else {
      //create new commment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          req.flash("error", "Something went wrong");
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;

          //save comment
          comment.save(function(err) {
            food.comments.push(comment);
            food.save(function(err) {
              req.flash("Successfully added comment");
              res.redirect("/seeMenu/" + food._id);
            });
          });
        }
      });
    }
  });
});

//Comment: edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(
  req,
  res
) {
  // look for the specific comment in db to edit
  Menu.findById(req.params.id, function(err, foundMenu) {
    if (err || !foundMenu) {
      req.flash("error", "No Menu found");
      return res.redirect("/seeMenu");
    }
    // Edit comment once found in db
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      }
      // show the edit route so users can update the comment
      else {
        res.render("comments/edit", {
          food_id: req.params.id,
          comment: foundComment
        });
      }
    });
  });
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  // Look for comment by id in db to update
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    }
    //  go back the updated menu
    else {
      res.redirect("/seeMenu/" + req.params.id);
    }
  });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  //findByIdAnd Remove
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    // check for error and return back
    if (err) {
      res.redirect("back");
    }
    // notify comment was deleted
    else {
      req.flash("success", "Comment deleted");
      res.redirect("/seeMenu/" + req.params.id);
    }
  });
});

module.exports = router;
