import axios from "axios";

async function getAddressOfCoord(lat, lng) {
  const response = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json?",
    {
      params: {
        key: "d89656440551428dac06b03871fc9727",
        q: `${lat}+${lng}`,
        language: "native",
      },
    }
  );
  return response;
}
export default getAddressOfCoord;
