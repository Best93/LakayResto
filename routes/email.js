var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var api_key = "11df56872464c66e5761b2f22c3eae2c-29b7488f-e65d5105";
var domain = "sandbox1cfafb0fb372429f97f3fcfb1c2db78a.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
// " / " ===> render the home page using this route
router.get("/", function(req, res) {
  res.render("contact");
});

// "/post route "====> route for a booking confirmation

router.post("/", function(req, res) {
  var data = {
    from:
      "Mail Gun lakayResto<20190622092618.1.1A774D200D286950@sandbox1cfafb0fb372429f97f3fcfb1c2db78a.mailgun.org>",
    to: "matadorzoe@gmail.com",
    subject: req.body.name,
    text: req.body.message
  };

  mailgun.messages().send(data, function(error, body) {
    if (error) {
      res.send("Mail not Sent");
    } else {
      res.send("Mail sent");
    }
  });
});

module.exports = router;
