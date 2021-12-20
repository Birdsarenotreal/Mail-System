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
  const history = useHistory();

  const findEmail = (contains) => {
    const test = mails.filter(
      (el) =>
        el.subject.includes(contains) == true ||
        el.content.includes(contains) == true ||
        el.from.includes(contains) == true
    );
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
  const deleteMail = (id) => {
    axios
      .delete("http://localhost:5000/mails/", { params: { id: id } })
      .then(alert("Email deleted."))
      .catch((err) => console.log(err.response.data));
    setMails(mails.filter((el) => el._id !== id));
  };

  const loadMails = (e) => {
    axios
      .get("http://localhost:5000/mails/", { params: { userName: userName } })
      .then((data) => {
        setMails(data.data);
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
    <div className="row">
      <div className="row">
        <button className="col-2" onClick={Logout}>
          Logout
        </button>
        <button className="col-2 offset-md-2" onClick={loadMails}>
          Refresh emails.
        </button>
        <button
          className="col-2 offset-md-2"
          onClick={() => {
            setCompose(true);
            setRead(false);
          }}
        >
          Compose new email.
        </button>
      </div>
      <div className="input-group">
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
      ></List>
      {compose && (
        <CreateMail from={userName} cc={selectedMail.from}></CreateMail>
      )}
      {read && <Reader mail={selectedMail}></Reader>}
    </div>
  );
}
