const router = require("express").Router();

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({ email, password });

  newUser
    .save()
    .then((User) => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Erro: " + err));
});

// router.route("/:id").delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then((User) => res.json("User deleted"))
//     .catch((err) => res.status(400).json("error: " + err));
// });

// router.route("/update/:id").put((req, res) => {
//   User.findById(req.params.id).then((User) => {
//     User.email = req.body.email;
//     User.description = req.body.description;
//     User.duration = Number(req.body.duration);
//     User.date = Date.parse(req.body.date);

//     User
//       .save()
//       .then(() => res.json("User updated!"))
//       .catch((err) => res.status(400).json("error:" + err));
//   });
// });

module.exports = router;
