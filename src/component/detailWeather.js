import React from "react";
import "../css/detailWeather.scss";
import { FiSun, FiWind, FiEye } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { IconContext } from "react-icons";
export default function DetailWeather({ weatherInfo }) {
  return (
    <div className="container">
      <div className="col">
        <div className="wrap">
          <div className="title">UV index</div>
          <IconContext.Provider value={{ color: "yellow", size: "3em" }}>
            <FiSun />
          </IconContext.Provider>
          <div className="value">{weatherInfo.current.uvi}</div>
        </div>
      </div>
      <div className="col">
        <div className="wrap">
          <div className="title">Wind status</div>
          <IconContext.Provider value={{ color: "cyan", size: "3em" }}>
            <FiWind />
          </IconContext.Provider>
          <div className="value">
            {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h
          </div>
        </div>
      </div>
      <div className="col">
        <div className="wrap">
          <div className="title">Humidity</div>
          <IconContext.Provider value={{ color: "blue", size: "3em" }}>
            <WiHumidity />
          </IconContext.Provider>
          <div className="value">{weatherInfo.current.humidity}%</div>
        </div>
      </div>
      <div className="col">
        <div className="wrap">
          <div className="title">Visibiliti</div>
          <IconContext.Provider value={{ color: "orange", size: "3em" }}>
            <FiEye />
          </IconContext.Provider>
          <div className="value">{weatherInfo.current.visibility} m</div>
        </div>
      </div>
    </div>
  );
}
