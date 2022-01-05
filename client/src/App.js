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
    <Router >
      <div>
        <Nav />
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
