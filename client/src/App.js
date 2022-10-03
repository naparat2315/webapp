import "./App.css"
import React, { useState } from "react";
import Register from './Register';
import Login from "./Login";
import Upload from "./Upload";
import Result from "./Result";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;