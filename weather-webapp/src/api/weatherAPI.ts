import axios from "./axios";

const CITITES_URL = "/cities";
const FORECAST_URL = "/weather_forecasts";

export interface CitySearchParams {
  city?: string;
  page?: number;
  token: string;
}

export async function getCities({ token, city, page = 1 }: CitySearchParams) {
  const data = {
    params: {
      city,
      page,
    },
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
  
