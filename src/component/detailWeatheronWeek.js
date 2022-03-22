import React from "react";
import "../css/detailWeek.scss";
export default function DetailWeatherWeek({ weatherInfo, date }) {
  console.log(date);
  return (
    <div className="DetailWeek">
      <div className="Container">
        <div className="date">
          {date.day} ngày {date.date}/{date.month}
        </div>

        <div className="temp">
          Nhiệt độ: {Math.round(weatherInfo.temp.day)}
          <span>°C</span>{" "}
        </div>
        <div className="temp">Độ ẩm: {weatherInfo.humidity}%</div>
        <div className="temp">Tốc độ gió: {weatherInfo.wind_speed} km/s</div>
        <div className="temp">UV: {weatherInfo.uvi}</div>
        <div>Mô tả thời tiết: {weatherInfo.weather[0].description}</div>
      </div>
    </div>
  );
}
