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
    console.log(from);
  }, [to]);
  const onChangeTo = (e) => {
    setTo(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeDate = (e) => {
    var date = new Date();
    setDate(date);
  };
  console.log(from, "from frontend");
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(date, "createmail component log");
    const mail = {
      from: from,
      to: to,
      content: content,
      subject: subject,
      date: date,
    };
    axios
      .post("http://localhost:5000/mails/add", mail)
      .then((res) => {
        alert("mail sent succesffly");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">To:</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={onChangeTo}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Subject:</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={onChangeSubject}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Date:</label>
        <input
          type="date"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={onChangeDate}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={onChangeContent}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success mt-2">
        Send email.
      </button>
    </form>
  );
}
