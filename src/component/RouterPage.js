import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "../css/Router.scss";
import DetailWeather from "./detailWeather";
import WeatherAndForecast from "./ForeCast";
export default function RouterPage({ weatherInfo, location, props }) {
  return (
    <div className="title">
      <BrowserRouter>
        <nav id="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              !isActive ? "nav--deactive" : " nav--deactive nav--active"
            }
          >
            Today
          </NavLink>

          <NavLink
            to="/week"
            className={({ isActive }) =>
              !isActive ? "nav--deactive" : " nav--deactive nav--active"
            }
          >
            Week
          </NavLink>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<DetailWeather weatherInfo={weatherInfo} />}
          />
          <Route
            path="/week"
            element={
              <WeatherAndForecast
                weatherInfo={weatherInfo}
                location={location}
                dtToDates={props}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
