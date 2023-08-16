//apikey: d89656440551428dac06b03871fc9727
import axios from "axios";

async function getCoordOfAddress(address) {
  const response = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json? ",
    {
      params: {
        key: "a60096be7f7b405a916b1785d6417809",
        q: address,
        language: "native",
      },
    }
  );
  return response;
}
export default getCoordOfAddress;
