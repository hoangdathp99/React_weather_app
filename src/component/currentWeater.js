import React from "react";
import "../css/currentWeather.scss";
export default function Current({ weatherInfo, location, date }) {
  return (
    <div className="Weather_Cr">
      <div className="info">
        <div className="image">
          <img
            alt="test"
            className="icon"
            src={
              "https://openweathermap.org/img/wn/" +
              weatherInfo.current.weather[0].icon +
              ".png"
            }
          />
        </div>
        <div className="location">
          <div className="city_name">{location.city}</div>
          <div className="country_name">{location.country}</div>
          <div className="date">{date.day}</div>
        </div>
        <ul className="list">
          <li className="temp">
            {Math.round(weatherInfo.current.temp)}
            <span>°C</span>
          </li>
          <li> Humidity: {weatherInfo.current.humidity}%</li>
          <li>Wind: {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h</li>
        </ul>
      </div>
    </div>
  );
}
