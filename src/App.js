import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./components/List.js";
import Login from "./components/Login.jsx";
import "./App.css";
import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="main">
        <div className="container">
          <Login></Login>
          {/* <Route path="/" exact element={<Login />} />
          <Route path="/signin" element={<Login />} /> */}
        </div>
      </div>
    </Router>
  );
}
export default App;
