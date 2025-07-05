import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityDetails } from "../../api/weatherAPI";
import { RootState } from "../../store";

interface ForecastData {
  temp: number;
  date: string;
  weather_description: string;
  min_temp: number;
  max_temp: number;
}

interface ForecastState {
  forecast: ForecastData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  forecast: null,
  loading: false,
  error: null,
};

export const fetchCityForecast = createAsyncThunk(
  "forecast/fetchCityForecast",
  async (
    {
      token,
      citySlug,
      state,
      country,
      latitude,
      longitude,
    }: { token: string; citySlug: string; state: string; country: string; latitude: string; longitude: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getCityDetails(token, citySlug, state, country, latitude, longitude);

      if (response.status != 200) {
        return rejectWithValue(response.data);
      }

      return response.data.forecast;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching forecast");
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    clearForecast(state) {
      state.forecast = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchCityForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearForecast } = forecastSlice.actions;
export const selectForecast = (state: RootState) => state.forecast;
export default forecastSlice.reducer;