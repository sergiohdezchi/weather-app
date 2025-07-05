import axios from "./axios";

const CITITES_URL = "/cities";
const FORECAST_URL = "/weather_forecasts";

export async function getCities(token: string) {
  const data = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .get(CITITES_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response;
    });
}

export async function getCityDetails(
    token: string,
    citySlug: string,
    state: string,
    country: string,
    latitude: string,
    longitude: string
) {
    const data = {
        params: {
            city: citySlug,
            state: state,
            country: country,
            latitude: latitude,
            longitude: longitude,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios
      .get(FORECAST_URL, data)
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error.response;
      });
  }
  
