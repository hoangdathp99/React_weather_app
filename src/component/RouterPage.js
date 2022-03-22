import React, { useRef } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import "../css/Router.scss";
import DetailWeather from "./detailWeather";
import WeatherAndForecast from "./ForeCast";
export default function RouterPage({ weatherInfo, location, props }) {
  return (
    // <div>ALO</div>
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

          {/* <Link id="link2" to="week">
            Week
          </Link> */}
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
                // reload={true}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
