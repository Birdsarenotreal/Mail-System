const router = require("express").Router();

let User = require("../models/user.model");

router.route("/signup").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  User.find({ email: email }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error.",
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: "Error: Account already exists.",
      });
    }
  });

  const newUser = new User({ email, password });

  newUser
    .save()
    .then((User) => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
