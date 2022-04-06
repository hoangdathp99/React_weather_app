import React from "react";
import { useState } from "react";
import "../css/search.scss";
export default function Search({ props }) {
  const [currentCity, setCurrentCity] = useState("");

  const handleInputChange = (e) => {
    setCurrentCity(e.target.value);
  };

  const handleButtonClick = () => {
    //send input city name to App component
    if (currentCity.trim() === "") return;
    props(currentCity);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };
  return (
    <div className="Search">
      <div className="lable">
        <input
          className="S_input"
          value={currentCity}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="search"
        ></input>
      </div>
    </div>
  );
}
