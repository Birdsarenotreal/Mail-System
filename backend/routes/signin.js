const router = require("express").Router();

let User = require("../models/user.model");
let UserSession = require("../models/UserSession.model");

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

  const newUser = new User();
  newUser.email = email;
  newUser.password = newUser.generateHash(password);

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
});

router.route("/login").post((req, res) => {
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
    if (docs.length !== 1) {
      return res.status(500).json({ error: "Email/Password is incorrect!" });
    } else {
      const user = docs[0];

      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid",
        });
      }
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: server error",
          });
        }
        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id,
        });
      });
    }
  });
});

router.route("/logout").get((req, res) => {
  const { query } = req;
  const { token } = query;
  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Good",
      });
    }
  );
});
module.exports = router;
