import React, { useState } from "react";
import Current from "./currentWeater";
import DetailWeatherWeek from "./detailWeatheronWeek";
import WeekWeather from "./WeekWeather";

// import "../styles/WeatherAndForecast.css";

function WeatherAndForecast({ weatherInfo, dtToDates }) {
  const [detailData, setDetailData] = useState({});
  const [date, setDate] = useState({});
  const initialState = {};
  const getDetailData = (value1, value2) => {
    setDetailData(value1);
    setDate(value2);
  };

  return (
    <div className="WeatherAndForecast">
      <div className="WeatherAndForecast__container">
        <div className="row">
          {weatherInfo.daily.map((weatherdaily) => {
            return (
              <WeekWeather
                weatherInfo={weatherdaily}
                date={dtToDates(weatherdaily.dt)}
                getDetailData={getDetailData}
                defaultInfo={weatherInfo.daily[0]}
                defaultDate={dtToDates(weatherInfo.daily[0].dt)}
              />
            );
          })}
        </div>
        {Object.keys(detailData).length !== 0 ? (
          <DetailWeatherWeek weatherInfo={detailData} date={date} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default WeatherAndForecast;
