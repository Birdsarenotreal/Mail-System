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

export default function Home() {
  const [mails, setMails] = useState([]);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const history = useHistory();

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
    <div>
      <button onClick={Logout}>Logout</button>
      <button onClick={loadMails}>Refresh emails.</button>
      <List data={mails} delete={deleteMail}></List>
      <CreateMail from={userName}></CreateMail>
    </div>
  );
}
