import { useEffect, useState } from "react";
import getCoordOfAddress from "./api/opencage";
import getWeaterdetail from "./api/openweather";
import getAddressOfCoord from "./api/reverse_opencage";
import Current from "./component/currentWeater";
import Header from "./component/header";
import RouterPage from "./component/RouterPage";
import "./css/App.scss";
function App() {
  const [address, SetAddress] = useState("");
  const [location, setLocation] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});

  //Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        //set city name sync 2 api call
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

  //Get weather detail
  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;

    getWeaterdetail(coordinates).then((res) => {
      setWeatherForecast(res.data);
    });
  }, [coordinates]);

  //Get weather by search city name
  useEffect(() => {
    if (address === "") return;

    getCoordOfAddress(address).then((res) => {
      if (
        res.data.results.lenght === 0 ||
        (res.data.results[0].components.city === undefined &&
          res.data.results[0].components.town === undefined)
      ) {
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

  //prop this function to search component to get city name
  const searhCity = (value) => {
    SetAddress(value);
  };

  //build day on weeks

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
              <Current
                weatherInfo={weatherForecast}
                location={location}
                date={dtToDate(weatherForecast.current.dt)}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="detail">
          <div className="wrap">
            {Object.keys(weatherForecast).length !== 0 ? (
              <RouterPage
                weatherInfo={weatherForecast}
                location={location}
                props={dtToDate}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
