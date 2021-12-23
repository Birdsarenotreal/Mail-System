import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateMail(props) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [from, setFrom] = useState(props.from);

  useEffect(() => {
    setFrom(props.from);
  }, [to]);
  useEffect(() => {
    if (props.reply === true) {
      console.log(props.cc.from, props.cc.subject);
      setTo(props.cc.from);
      setSubject(props.cc.subject);
    }
    if (props.reply === false) {
      setTo("");
      setSubject("");
    }
  }, []);
  const onChangeTo = (e) => {
    setTo(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var date = new Date();
    var validation = true;
    const recievers = to.split(",");
    for (var i = 0; i < recievers.length; i++) {
      if (!recievers[i].includes("@") || !recievers[i].includes(".")) {
        alert(
          "Email must be in the form of user@domain.TLD (either the @ or the . symbols are missing)"
        );
        validation = false;
      }
      const dot = recievers[i].split(".");

      if (dot[1] === "") {
        alert(
          "Email must be in the form of user@domain.TLD (the TLD is missing)"
        );
        validation = false;
      }

      for (var j = 0; j < recievers[i].length; j++) {
        if (recievers[i][j] === "@" && recievers[i][j + 1] === ".") {
          alert(
            "Email must be in the form of user@domain.TLD (the domain is missing)"
          );
          validation = false;
        }
      }
    }
    if (!validation) {
      return;
    }
    recievers.forEach((el) => {
      const mail = {
        from: from,
        to: el,
        content: content,
        subject: subject,
        date: date,
      };
      axios
        .post("http://localhost:5000/mails/add", mail)
        .then((res) => {
          alert("Mail sent succesfully!");
          setContent("");
          setTo("");
          setSubject("");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">To:</label>
        <input
          title="To send a mail to multiple users, separate them by a comma."
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={onChangeTo}
          value={to}
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Subject:</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={onChangeSubject}
          value={subject}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Content:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={onChangeContent}
          value={content}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success mt-2">
        Send email.
      </button>
    </form>
  );
}
