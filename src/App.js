import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./components/List.js";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="main">
        <div className="container">
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
        </div>
      </div>
    </Router>
  );
}
export default App;
