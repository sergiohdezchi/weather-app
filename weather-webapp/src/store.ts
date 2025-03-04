import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sessionReducer from "./features/sessions/sessionSlice";
import cityReducer from "./features/dashboard/citySlice";
import forecastREeducer from "./features/dashboard/forecastSlice";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    cities: cityReducer,
    forecast: forecastREeducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;