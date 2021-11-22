const router = require("express").Router();

let Mail = require("../models/Mail.model");

router.route("/").get((req, res) => {
  Mail.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const subject = req.body.email;
  const to = req.body.to;
  const from = req.body.duration;
  const date = Date.parse(req.body.date);

  const newMail = new Mail({ subject, to, from, date });

  newMail
    .save()
    .then((Mail) => res.json("Mail added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Mail.findById(req.params.id)
    .then((Mail) => res.json(Mail))
    .catch((err) => res.status(400).json("Erro: " + err));
});

router.route("/:id").delete((req, res) => {
  Mail.findByIdAndDelete(req.params.id)
    .then((Mail) => res.json("Mail deleted"))
    .catch((err) => res.status(400).json("error: " + err));
});

// router.route("/update/:id").put((req, res) => {
//   Mail.findById(req.params.id).then((Mail) => {
//     Mail.email = req.body.email;
//     Mail.description = req.body.description;
//     Mail.duration = Number(req.body.duration);
//     Mail.date = Date.parse(req.body.date);

//     Mail
//       .save()
//       .then(() => res.json("Mail updated!"))
//       .catch((err) => res.status(400).json("error:" + err));
//   });
// });

module.exports = router;
