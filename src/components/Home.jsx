import React, { useState, useEffect } from "react";
import List from "./List";
import {
  setInStorage,
  getFromStorage,
  removeFromStorage,
} from "../utils/storage.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateMail from "./CreateMail";
import Reader from "./Reader";

export default function Home() {
  const [mails, setMails] = useState([]);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedMail, setSelectedMail] = useState("");
  const [contains2, setContains2] = useState("");
  const [read, setRead] = useState("");
  const [compose, setCompose] = useState("");
  const [reply, setReply] = useState(false);
  const [sent, setSent] = useState(true);
  const history = useHistory();

  const findEmail = (contains) => {
    const test = mails.filter(
      (el) =>
        el.subject.toLowerCase().includes(contains.toLowerCase()) == true ||
        el.content.toLowerCase().includes(contains.toLowerCase()) == true ||
        el.from.toLowerCase().includes(contains.toLowerCase()) == true
    );
    console.log(test);
    setMails(test);
  };

  useEffect(() => {
    const obj = getFromStorage("the_main_app");

    if (!obj) {
      history.push("/");
      return;
    }
    setToken(obj.token);
    setUserName(obj.userName);
  });

  useEffect(() => {
    setSent(false);
  }, []);
  const deleteMail = (id) => {
    axios
      .delete("http://localhost:5000/mails/", { params: { id: id } })
      .then(() => {
        alert("Email deleted.");
        setRead(false);
      })
      .catch((err) => console.log(err.response.data));
    setMails(mails.filter((el) => el._id !== id));
  };

  const loadMails = (e) => {
    axios
      .get("http://localhost:5000/mails/", { params: { userName: userName } })
      .then((data) => {
        setMails(data.data);
        setSent(false);
      });
    console.log(mails);
  };
  const sentMails = () => {
    axios
      .get("http://localhost:5000/mails/sent", { params: { from: userName } })
      .then((data) => {
        setMails(data.data);
        setSent(true);
      });
    console.log(mails);
  };
  const onChangeContains = (e) => {
    setContains2(e.target.value);
  };

  const Logout = (e) => {
    if (token) {
      axios
        .get("http://localhost:5000/users/logout/", {
          params: { token: token },
        })
        .then((data) => {
          if (data.data.success) {
            console.log(data.data.message);
            removeFromStorage("the_main_app");
            setToken("");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  return (
    <div className="row py-4">
      <div className="col-md-2">
        <VerticalNavTwo
          logout={Logout}
          refresh={loadMails}
          composeProp={setCompose}
          readProp={setRead}
          replyProp={setReply}
          onSent={sentMails}
        ></VerticalNavTwo>
      </div>
      <div className="col-md-10">
        <div className="input-group pb-2">
          <div className="form-outline">
            <input
              type="search"
              id="form1"
              className="form-control"
              value={contains2}
              onChange={onChangeContains}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              findEmail(contains2);
            }}
          >
            <i className="fas fa-search">Search</i>
          </button>
        </div>

        <List
          data={mails}
          delete={deleteMail}
          selected={setSelectedMail}
          toggleReadOn={setRead}
          toggleComposeOff={setCompose}
          sent={sent}
        ></List>
        {compose && (
          <CreateMail
            from={userName}
            cc={selectedMail}
            reply={reply}
          ></CreateMail>
        )}
        {read && (
          <Reader
            mail={selectedMail}
            reply={setReply}
            toggleReadOff={setRead}
            toggleComposeOn={setCompose}
          ></Reader>
        )}
      </div>
    </div>
  );
}

const VerticalNavTwo = (props) => (
  <ul className="nav flex-column">
    <li className="nav-item m-1">
      <button className="btn btn-primary w-100" onClick={props.logout}>
        Logout
      </button>
    </li>
    <li className="nav-item m-1">
      <button className="btn btn-primary w-100" onClick={props.refresh}>
        Refresh emails.
      </button>
    </li>
    <li className="nav-item m-1">
      <button
        className="btn btn-primary w-100"
        onClick={() => {
          props.composeProp(true);
          props.readProp(false);
          props.replyProp(false);
        }}
      >
        Compose new email.
      </button>
    </li>
    <li className="nav-item m-1">
      <button className="btn btn-primary w-100" onClick={() => props.onSent()}>
        Sent mails.
      </button>
    </li>
    <li className="nav-item m-1">
      <button className="btn btn-primary w-100" onClick={props.refresh}>
        Inbox.
      </button>
    </li>
  </ul>
);
