import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [signUpError, setSignUpError] = useState("");
  const [signInError, setSignInError] = useState("");

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
    setLoading(true);
    const User = { email: email, password: password };
    axios
      .post("http://localhost:5000/users/add", User)
      .then(console.log("user added."))
      .catch((err) => {
        if (err.response) {
          setSignUpError(err.response.data.error);
        }
      });
  };

  return (
    <form onSubmit={onSignUp}>
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
      <div className="form-group text-danger m-1">{signUpError}</div>
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
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Login.
      </button>
      &nbsp;
      <button type="submit" className="btn btn-primary">
        Sign up.
      </button>
    </form>
  );
}
