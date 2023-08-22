import { useCallback, useEffect, useState } from "react";
import getCoordOfAddress from "./api/opencage";
import getWeaterdetail from "./api/openweather";
import getAddressOfCoord from "./api/reverse_opencage";
import Current from "./component/currentWeater";
import Header from "./component/header";
import Loader from "./component/Loader";
import RouterPage from "./component/RouterPage";
import Warnning from "./component/Warning";
import "./css/App.scss";
function App() {
  const [contentState, setContentState] = useState("none");
  const [address, SetAddress] = useState("");
  const [location, setLocation] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});

  const Main = {
    none: () => null,
    loading: () => <Loader />,
    warning: () => <Warnning />,
    done: () => (
      <Current
        weatherInfo={weatherForecast}
        location={location}
        date={dtToDate(weatherForecast.current.dt)}
      />
    ),
  };
  const showWarning = () => {
    setContentState("warning");
    setTimeout(() => setContentState("none"), 3000);
  };
  //Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      setContentState("loading");
      navigator.geolocation.getCurrentPosition(function (position) {
        //set city name sync 2 api call

        getAddressOfCoord(position.coords.latitude, position.coords.longitude)
          .then((res) => {
            setLocation({
              city: res.data.results[0].components.city,
              state: res.data.results[0].components.state,
              country: res.data.results[0].components.country,
            });
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          })
          .catch((error) => console.log(error));
      });
    }
  }, []);

  //Get weather detail
  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;

    getWeaterdetail(coordinates).then((res) => {
      setWeatherForecast(res.data);
      setContentState("done");
    });
  }, [coordinates]);

  //Get weather by search city name
  useEffect(() => {
    if (address === "") return;
    setContentState("loading");
    getCoordOfAddress(address)
      .then((res) => {
        if (
          res.data.results.lenght === 0 ||
          (res.data.results[0].components.city === undefined &&
            res.data.results[0].components.state === undefined)
        ) {
          showWarning();
          return;
        }

        setCoordinates(res.data.results[0].geometry);
        setLocation({
          city: res.data.results[0].components.city || res.data.results[0].components.state,
          state: res.data.results[0].components.state,
          country: res.data.results[0].components.country,
        });
      })
      .catch((error) => showWarning());
  }, [address]);

  //prop this function to search component to get city name
  const searhCity = (value) => {
    SetAddress(value);
  };

  //build day on weeks

  const dtToDate = useCallback((dt) => {
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
  },[]);
  return (
    <div className="App">
      <div className="row">
        <div className="summary">
          <div className="wrap">
            <Header props={searhCity}></Header>
            {Main[contentState]()}
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
