import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Add from "./components/Add";
import Watch from "./components/Watch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/watch" component={Watch} />
          <Route path="/add" component={Add} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
