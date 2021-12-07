const router = require("express").Router();

let User = require("../models/user.model");
let UserSession = require("../models/UserSession.model");

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

  promise
    .then((docs) => {
      if (docs.length !== 1) {
        return res
          .status(500)
          .json({ message: "Email/Password is incorrect!" });
      } else {
        const user = docs[0];

        if (!user.validPassword(password)) {
          return res.status(500).json({
            success: false,
            message: "Email/Password is incorrect!",
          });
        }

        const userSession = new UserSession();

        userSession.userId = user._id;
        console.log(userSession._id, "token at creation");
        userSession.save((err, doc) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "user session error", success: false });
          }
          return res.status(200).json({
            message: "user session created",
            token: doc._id,
            success: true,
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

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

router.route("/logout/").get((req, res) => {
  const token = req.query.token;
  console.log(token, "token at logout");
  UserSession.findOneAndRemove(
    {
      _id: token,
      isDeleted: false,
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Error: logout error." });
      }
      return res
        .status(200)
        .json({ success: true, message: "logout succesfull" });
    }
  );
});
module.exports = router;
