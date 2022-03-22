//apikey: c2ab6c0e983017cb096ed819c357cb19

import axios from "axios";

async function getWeaterdetail(coord) {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?",
    {
      params: {
        lat: coord.lat,
        lon: coord.lng,
        appid: "c2ab6c0e983017cb096ed819c357cb19",
        units: "metric",
        lang: "vi",
      },
    }
  );
  return response;
}
export default getWeaterdetail;
