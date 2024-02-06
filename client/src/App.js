//import React, { useEffect, useState } from "react";
//import { Switch, Route } from "react-router-dom";
// importing Login which gives this  app.js also access to the LoginFrom
//import Login from "./components/Home";

import { Outlet } from "react-router-dom";
import "./App.css"

function App() {
  //returns what I want to see on the page - in this case the login form
  return (
    <div className="App">
      <Outlet /> {/* This will render the child routes */}
    </div>
  );
}

export default App;