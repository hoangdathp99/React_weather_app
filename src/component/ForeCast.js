import React, { useEffect, useState } from "react";
import WeekWeather from "./WeekWeather";
import DetailWeatherWeek from "./detailWeatheronWeek";

function WeatherAndForecast({ weatherInfo, dtToDates }) {
  const [detailData, setDetailData] = useState({});
  const [date, setDate] = useState({});
  const [activeIndex, setActiveIndex] = useState();
  //set default detail data when research city

  const getDetailData = (value1, value2) => {
    setDetailData(value1);
    setDate(value2);
  };
  useEffect(()=>{
    getDetailData(weatherInfo.daily[0],dtToDates(weatherInfo.daily[0].dt))
    setActiveIndex(0)
  },[weatherInfo,dtToDates])
  const handleClickActive = (index) => {
    setActiveIndex(index);
    getDetailData(weatherInfo.daily[index],dtToDates(weatherInfo.daily[index].dt))
  };

  return (
    <div className="WeatherAndForecast">
      <div className="WeatherAndForecast__container">
        <div className="row">
          {weatherInfo.daily.map((weatherdaily, index) => {
            return (
              <WeekWeather
                handleClickActive={handleClickActive}
                activeIndex={activeIndex}
                index={index}
                key={index}
                weatherInfo={weatherdaily}
                date={dtToDates(weatherdaily.dt)}
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
