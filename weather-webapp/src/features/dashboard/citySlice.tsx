import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitySearchParams, getCities } from '../../api/weatherAPI';

export interface CityCardData {
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
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
  
const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  totalPages: 1,
  totalCount: 0
};

export const fetchCityWeather = createAsyncThunk(
  "city/fetchWeather",
  async (params: CitySearchParams, { rejectWithValue }) => {
    try {
      const citiesResponse = await getCities(params);
      if (citiesResponse.error) {
        return rejectWithValue(citiesResponse.data);
      }
      return {
        cities: citiesResponse.cities || [],
        totalPages: citiesResponse.total_pages || 1,
        currentPage: citiesResponse.current_page || 1,
        totalCount: citiesResponse.total_count || 0
      };
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
            state.searchTerm = '';
            state.currentPage = 1;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            // Reset pagination when changing search term
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCityWeather.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCityWeather.fulfilled, (state, action) => {
            state.cities = action.payload.cities;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.totalCount = action.payload.totalCount;
            state.loading = false;
          })
          .addCase(fetchCityWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
    },
});

export const { resetCities, setSearchTerm, setCurrentPage } = slice.actions;

export default slice.reducer