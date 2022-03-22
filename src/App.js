import { useEffect, useState } from "react";
import getCoordOfAddress from "./api/opencage";
import getWeaterdetail from "./api/openweather";
import getAddressOfCoord from "./api/reverse_opencage";
import Current from "./component/currentWeater";
import Header from "./component/header";
// import getDateForeCast from "./component/getDateForeCast";
import RouterPage from "./component/RouterPage";
import "./css/App.scss";
function App() {
  const [address, SetAddress] = useState("");
  const [location, setLocation] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getAddressOfCoord(position.coords.latitude, position.coords.longitude)
          .then((res) => {
            setLocation({
              city: res.data.results[0].components.city,
              state: res.data.results[0].components.state,
              country: res.data.results[0].components.country,
            });
          })
          .then((res) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
      });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;

    getWeaterdetail(coordinates).then((res) => {
      setWeatherForecast(res.data);
    });
    console.log(coordinates);
    console.log(location);
  }, [coordinates]);
  useEffect(() => {
    if (address === "") return;

    getCoordOfAddress(address).then((res) => {
      if (
        res.data.results.lenght === 0 ||
        (res.data.results[0].components.city === undefined &&
          res.data.results[0].components.town === undefined)
      ) {
        console.log("no address");
        return;
      }

      setCoordinates(res.data.results[0].geometry);
      setLocation({
        city: res.data.results[0].components.city,
        state: res.data.results[0].components.state,
        country: res.data.results[0].components.country,
      });
    });
  }, [address]);
  const searhCity = (value) => {
    SetAddress(value);
    console.log(value);
  };

  //build day on weeks
  // const date = dateBuilder(new Date());

  // function dateBuilder(d) {
  //   const days = [
  //     "Chủ Nhật",
  //     "Thứ 2",
  //     "Thứ 3",
  //     "Thứ 4",
  //     "Thứ 5",
  //     "Thứ 6",
  //     "Thứ 7",
  //   ];

  //   const date = [];

  //   for (let count = 0; count < 5; count++) {
  //     if (d.getDay() + count < 7) date[count] = d.getDay();
  //     else if (d.getDay() + count === 7) date[count] = 0;
  //     else if (d.getDay() + count === 8) date[count] = 1;
  //     else if (d.getDay() + count === 9) date[count] = 2;
  //     else if (d.getDay() + count === 10) date[count] = 3;
  //   }
  //   return [
  //     days[date[0]],
  //     days[date[1]],
  //     days[date[2]],
  //     days[date[3]],
  //     days[date[4]],
  //   ];
  // }
  const dtToDate = (dt) => {
    var d = new Date(dt * 1000);
    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    // console.log(d, dt);
    // console.log(days[d.getDay()]);
    return {
      day: days[d.getDay()],
      date: d.getDate(),
      month: d.getMonth(),
      hour: d.getHours(),
      minutes: d.getMinutes(),
    };
  };
  return (
    <div className="App">
      <div className="row">
        <div className="summary">
          <div className="wrap">
            <Header props={searhCity}></Header>
            {Object.keys(weatherForecast).length !== 0 ? (
              (console.log(weatherForecast),
              (
                <Current
                  weatherInfo={weatherForecast}
                  location={location}
                  date={dtToDate(weatherForecast.current.dt)}
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="detail">
          <div className="wrap">
            {/* <RouterPage
              weatherInfo={weatherForecast}
              location={location}
              date={date}
            /> */}
            {Object.keys(weatherForecast).length !== 0 ? (
              (console.log(weatherForecast),
              (
                <RouterPage
                  weatherInfo={weatherForecast}
                  location={location}
                  props={dtToDate}
                />
              ))
            ) : (
              <div></div>
            )}
            {/* <div className="weather-day">
              {Object.keys(weatherForecast).length !== 0 ? (
                <WeatherAndForecast
                  weatherInfo={weatherForecast}
                  location={location}
                />
              ) : (
                <div />
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
