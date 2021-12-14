const router = require("express").Router();

let Mail = require("../models/Mail.model");

router.route("/").get((req, res) => {
  const userName = req.query.userName;
  console.log(userName);
  const promise = Mail.find({ to: userName });
  promise
    .then((mails) => {
      res.json(mails);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
// router.route("/logout/").get((req, res) => {
//   const token = req.query.token;
//   console.log(token, "token at logout");
//   UserSession.findOneAndRemove(
//     {
//       _id: token,
//       isDeleted: false,
//     },
//     null,
//     (err, sessions) => {
//       if (err) {
//         console.log(err);
//         return res
//           .status(500)
//           .json({ success: false, message: "Error: logout error." });
//       }
//       return res
//         .status(200)
//         .json({ success: true, message: "logout succesfull" });
//     }
//   );
// });
router.route("/add").post((req, res) => {
  const subject = req.body.subject;
  const to = req.body.to;
  const from = req.body.from;
  const date = req.body.date;
  const content = req.body.content;

  const newMail = new Mail({ subject, to, from, date, content });

  newMail
    .save()
    .then((Mail) => res.json("Mail added"))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").get((req, res) => {
  Mail.findById(req.params.id)
    .then((Mail) => res.json(Mail))
    .catch((err) => res.status(400).json("Erro: " + err));
});

router.route("/").delete((req, res) => {
  const id = req.query.id;
  console.log(id);
  Mail.findByIdAndDelete(id)
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
