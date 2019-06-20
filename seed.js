var mongoose = require("mongoose");
var Menu = require("./models/menu");
var Comment = require("./models/comment");

var data = [
  {
    name: " Salad Ayisyen",
    price: "10.50",
    image: "/img/item1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,doloremque doloribus a, fuga expedita laborum ab quos illo et, id nisi?Debitis fugiat iure corrupti ducimus quia cum quidem aut consectetur"
  },
  {
    name: " Diri A Kribich",
    price: "9.50",
    image: "/img/item2.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,doloremque doloribus a, fuga expedita laborum ab quos illo et, id nisi?Debitis fugiat iure corrupti ducimus quia cum quidem aut consectetur"
  },
  {
    name: " Manje Ayisyen",
    image: "/img/item3.jpg",
    price: "12.50",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,doloremque doloribus a, fuga expedita laborum ab quos illo et, id nisi?Debitis fugiat iure corrupti ducimus quia cum quidem aut consectetur"
  },
  {
    name: " Mayi A Sos",
    price: "10.50",
    image: "/img/item4.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,doloremque doloribus a, fuga expedita laborum ab quos illo et, id nisi?Debitis fugiat iure corrupti ducimus quia cum quidem aut consectetur"
  },
  {
    name: " Riz Capois",
    price: "9.50",
    image: "/img/item5.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,doloremque doloribus a, fuga expedita laborum ab quos illo et, id nisi?Debitis fugiat iure corrupti ducimus quia cum quidem aut consectetur"
  },
  {
    name: " Krab A Diri",
    image: "/img/item6.jpg",
    price: "12.50",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,doloremque doloribus a, fuga expedita laborum ab quos illo et, id nisi?Debitis fugiat iure corrupti ducimus quia cum quidem aut consectetur"
  }
];

function seedDB() {
  //Remove all menu
  Menu.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed menu!");
    Comment.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      }
      console.log("removed comments!");
      //add a few food
      data.forEach(function(seed) {
        Menu.create(seed, function(err, menu) {
          if (err) {
            console.log(err);
          } else {
            console.log("added amenu");
            //create a comment
            /* Comment.create(
              {
                text: "This place is great, but I wish there was internet",
                author: "Homer"
              },
              function(err, comment) {
                if (err) {
                  console.log(err);
                } else {
                  menu.comments.push(comment);
                  menu.save();
                  console.log("Created new comment");
                }
              }
            );  */
          }
        });
      });
    });
  });
  //add a few comments
}

module.exports = seedDB;
