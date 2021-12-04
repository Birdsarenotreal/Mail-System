import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css";
import axios from "axios";
import { setInStorage, getFromStorage } from "../utils/storage.js";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setSignUpError("");
  };
  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setSignUpError("");
  };

  const onSignUp = (e) => {
    e.preventDefault();
    const User = { email: email, password: password };
    axios
      .post("http://localhost:5000/users/add", User)
      .then((user) => {
        alert("Account created succesfully!");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (err.response) {
          setSignUpError(err.response.data.error);
        }
      });
  };
  return (
    <form onSubmit={onSignUp} className="text-center">
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
      <div className="form-group text-danger m-1"> {signUpError}</div>
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
      <button type="submit" className="btn btn-primary mt-2" onClick={onSignUp}>
        Sign up.
      </button>
      &nbsp;
      <div className="form-group m-1">
        {" "}
        Already have an account? Click <a href="/login">here</a> to log in.
      </div>
      &nbsp;
    </form>
  );
}
