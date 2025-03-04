import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { Card, Box, CardContent, Typography, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { fetchCityWeather } from "./citySlice";
import { useNavigate } from "react-router-dom";

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

function CityCards() {
  const dispatch = useAppDispatch();
  const accessToken = useSelector((state: RootState) => state.session.accessToken);
  const cities = useSelector((state: RootState) => state.cities.cities);
  const loading = useSelector((state: RootState) => state.cities.loading);
  const error = useSelector((state: RootState) => state.cities.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCityWeather(accessToken));
    }
  }, [accessToken, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Grid container spacing={3}>
        {cities?.map((card: CityCardData, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 275, boxShadow: 3 }}
                  onClick={() => navigate(`/city`, { state: { city: card } })} >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6" component="div">
                      {card.city_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.weather?.weather_description}
                    </Typography>
                  </Box>
                  <Typography variant="h6" component="div" sx={{ textAlign: "right" }}>
                    {card.weather?.temp}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CityCards;