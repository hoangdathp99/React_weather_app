import React from "react";
import Search from "./search";
import "../css/header.scss";
export default function Header({ props }) {
  return (
    <header>
      <h1>Weather App</h1>
      <Search props={props}></Search>
    </header>
  );
}
