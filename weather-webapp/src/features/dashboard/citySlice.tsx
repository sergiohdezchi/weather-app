import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCities } from '../../api/weatherAPI';

interface CityCardData {
    city_name: string;
    city_slug: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
    weather?: {
      weather_description: string;
      temp: number;
    };
}
  
  interface CityState {
    cities: CityCardData[];
    loading: boolean;
    error: string | null;
}
  
  const initialState: CityState = {
    cities: [],
    loading: false,
    error: null,
};

export const fetchCityWeather = createAsyncThunk(
    "city/fetchWeather",
    async (token: string, { rejectWithValue }) => {
      try {
        const citiesResponse = await getCities(token);
        console.log(citiesResponse);
        console.log(citiesResponse.error);
        if (citiesResponse.error) {
            return rejectWithValue(citiesResponse.data);
          }
          const response = {
            ...citiesResponse,
          };
          return response;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);

const slice = createSlice({
    name: 'cities',
    initialState: initialState,
    reducers: {
        resetCities: (state) => {
            state.cities = [];
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCityWeather.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCityWeather.fulfilled, (state, action) => {
            state.cities = action.payload.cities;
            state.loading = false;
          })
          .addCase(fetchCityWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
    },
});

export const { resetCities } = slice.actions;

export default slice.reducer