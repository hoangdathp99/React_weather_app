import axios from "axios";

async function getAddressOfCoord(lat, lng) {
  const response = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json?",
    {
      params: {
        key: "a60096be7f7b405a916b1785d6417809",
        q: `${lat}+${lng}`,
        language: "native",
      },
    }
  );
  return response;
}
export default getAddressOfCoord;
