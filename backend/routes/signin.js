const router = require("express").Router();

let User = require("../models/user.model");

router.route("/add").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  if (!email || !password) {
    return res.status(500).json({ error: "Email/password cant be empty" });
  }
  User.find({ email: email }, (error, docs) => {
    if (docs.length > 0)
      return res.status(500).json({ error: "Email already exists." });
  });
  const newUser = new User({ email, password });

  newUser
    .save()
    .then((User) => res.json("User added"))
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
