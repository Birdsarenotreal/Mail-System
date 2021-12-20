import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateMail(props) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState();
  const [from, setFrom] = useState(props.from);

  useEffect(() => {
    setFrom(props.from);
    //console.log(from);
  }, [to]);
  const onChangeTo = (e) => {
    setTo(e.target.value);
    console.log(to);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  //console.log(from, "from frontend");
  const onSubmit = (e) => {
    e.preventDefault();
    var date = new Date();
    setDate(date);
    const recievers = to.split(",");
    //console.log(date, "createmail component log");
    recievers.map((el) => {
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
          console.log(mail.to);
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
