import React from "react";
import Search from "./search";
export default function Header({ props }) {
  return (
    <header>
      <h1>Weather App After Deploy Times 2</h1>
      <Search props={props}></Search>
    </header>
  );
}
