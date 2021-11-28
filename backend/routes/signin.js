const router = require("express").Router();

let User = require("../models/user.model");

router.route("/add").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({ error: "Email/password cant be empty" });
  }
  if (!email.includes("@")) {
    return res.status(500).json({ error: "Email must contain @." });
  }

  const promise = User.find({ email: email });

  promise.then((docs) => {
    if (docs.length > 0) {
      return res.status(500).json({ error: "Email is already taken." });
    } else {
      newUser
        .save()
        .then((User) => res.json("User added test"))
        .catch((err) => res.status(500).json("Error: " + err));
    }
  });

  const newUser = new User({ email, password });
});

module.exports = router;
