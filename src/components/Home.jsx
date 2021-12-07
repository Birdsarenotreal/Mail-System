import React, { useState } from "react";
import List from "./List";
import { setInStorage, getFromStorage } from "../utils/storage.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [token, setToken] = useState("");
  const history = useHistory();

  const Logout = (e) => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      axios
        .get("http://localhost:5000/users/logout/", {
          params: { token: obj.token },
        })
        .then((data) => {
          if (data.data.success) {
            console.log(data.data.message);
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
      <List></List>
    </div>
  );
}
