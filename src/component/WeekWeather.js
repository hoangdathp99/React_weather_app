import React, { memo } from "react";
import "../css/weekWeather.scss";
function WeekWeather({
  weatherInfo,
  date,
  handleClickActive,
  activeIndex,
  index,
}) {
  const handleButtonClick = () => {
    handleClickActive(index);
  };
  
  return (
    <div className="col">
      <div
        className={activeIndex === index ? "wrap active" : "wrap"}
        onClick={handleButtonClick}
      >
        <div className="Forecast__day">
          {date.day} {date.date}/{date.month}
        </div>
        <img
          className="Forecast__weather-icon"
          src={
            "https://openweathermap.org/img/wn/" +
            weatherInfo.weather[0].icon +
            ".png"
          }
          alt={weatherInfo.weather[0].main}
        />
        <div className="Forecast__temperature">
          <span className="temperature__max">
            {Math.round(weatherInfo.temp.max)}
            <sup className="temperature__symbol">°</sup>
          </span>
          <span className="temperature__min">
            {Math.round(weatherInfo.temp.min)}
            <sup className="temperature__symbol">°</sup>
          </span>
        </div>
      </div>
    </div>
  );
}
export default memo(WeekWeather);
