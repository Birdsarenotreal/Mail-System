import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reader(props) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");

  useEffect(() => {
    setFrom(props.mail.from);
    setTo(props.mail.to);
    setContent(props.mail.content);
    setDate(props.mail.date);
    setSubject(props.mail.subject);
    //console.log(from);
  });

  return (
    // <div>
    //   <div>
    //     <h5>From:</h5>
    //     <div>{from}</div>
    //   </div>
    //   <div>
    //     <h5>Subject:</h5>
    //     <p>{subject}</p>
    //   </div>
    //   <div>
    //     <h5>Date:</h5>
    //     <p>{date}</p>
    //   </div>
    //   <div>
    //     <h5>Content:</h5>
    //     <p>{content}</p>
    //   </div>
    // </div>
    <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">To:</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={to || ""}
          autoComplete="off"
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">From:</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          value={from || ""}
          autoComplete="off"
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Date:</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          value={date || ""}
          autoComplete="off"
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Subject:</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={subject || ""}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Content:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={content || ""}
          readOnly
        ></textarea>
      </div>
    </form>
  );
}
