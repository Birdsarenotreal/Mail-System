const router = require("express").Router();

let Mail = require("../models/Mail.model");

router.route("/").get((req, res) => {
  const userName = req.query.userName;
  //console.log(userName);
  const promise = Mail.find({ to: userName });
  promise
    .then((mails) => {
      res.json(mails);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/sent").get((req, res) => {
  const from = req.query.from;
  //console.log(from);
  const promise = Mail.find({ from: from });
  promise
    .then((mails) => {
      res.json(mails);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

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

router.route("/").delete((req, res) => {
  const id = req.query.id;
  //console.log(id);
  Mail.findByIdAndDelete(id)
    .then((Mail) => res.json("Mail deleted"))
    .catch((err) => res.status(400).json("error: " + err));
});

module.exports = router;
