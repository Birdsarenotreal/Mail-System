const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mailSchema = new Schema(
  {
    subject: { type: String, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
