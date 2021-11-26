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

  // const onLogin = (e) => {
  //   e.preventDefault();

  //   const Users = {};
  //   axios
  //     .get("http://localhost:5000/user/")
  //     .then((data) => ({
  //       Users: data,
  //     }))
  //     .catch((error) => console.log(error));
  // };
  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const onSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const User = { email: email, password: password };
    handleValidation();
    axios
      .post("http://localhost:5000/users/add", User)
      .then(console.log("user added."))
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.error);
        }
      });
  };

  const handleValidation = () => {
    if (!email) {
      alert("The email field cant be empty.");
    }
    if (!password) {
      alert("The password field cant be empty.");
    }
    if (!email.includes("@")) {
      alert("The email format must be in the form of user@domain.");
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email || ""}
          onChange={onChangeEmail}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
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
      <button type="submit" className="btn btn-primary" onClick={onSignUp}>
        Sign up.
      </button>
    </form>
  );
}
