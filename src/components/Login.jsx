import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css";
import axios from "axios";
import { setInStorage, getFromStorage } from "../utils/storage.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [signInError, setSignInError] = useState("");

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setSignInError("");
  };
  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setSignInError("");
  };

  const onLogIn = (e) => {
    const User = { email: email, password: password };
    axios
      .post("http://localhost:5000/users/login", User)
      .then((data) => {
        if (data.success) {
          setInStorage("the_main_app", { token: data.token });
          setEmail("");
          setPassword("");
          setToken(data.token);
        } else {
          setSignInError(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={onLogIn} className="text-center">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          required
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email || ""}
          onChange={onChangeEmail}
        />
      </div>
      <div className="form-group text-danger m-1"> {signInError}</div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          required
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password || ""}
          onChange={onChangePassword}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2" onClick={onLogIn}>
        Login.
      </button>
      &nbsp;
      <div className="form-group m-1">
        {" "}
        Don't have an account? Click <a href="/signup">here</a> to sign up.
      </div>
    </form>
  );
}
