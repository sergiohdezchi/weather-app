import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { 
  Card, Box, CardContent, Typography, Grid, 
  Skeleton, CardMedia, CardActionArea, Chip, Divider
} from "@mui/material";
import { useEffect } from "react";
import { fetchCityWeather } from "./citySlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

// Función para determinar el icono del clima según la descripción
function getWeatherIcon(description: string | undefined) {
  if (!description) return <CloudIcon />;
  
  const desc = description.toLowerCase();
  if (desc.includes('sun') || desc.includes('clear')) return <WbSunnyIcon sx={{ color: '#ff9800' }} />;
  if (desc.includes('cloud') || desc.includes('overcast')) return <CloudIcon sx={{ color: '#78909c' }} />;
  if (desc.includes('rain') || desc.includes('drizzle')) return <WaterIcon sx={{ color: '#42a5f5' }} />;
  if (desc.includes('thunder') || desc.includes('storm')) return <ThunderstormIcon sx={{ color: '#5c6bc0' }} />;
  if (desc.includes('snow') || desc.includes('ice')) return <AcUnitIcon sx={{ color: '#90caf9' }} />;
  
  return <CloudIcon />;
}

// Función para determinar el background según la temperatura
function getBackgroundGradient(temp: number | undefined) {
  if (!temp) return 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)';
  
  if (temp > 303) { // > 30°C (calor)
    return 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)';
  } else if (temp > 293) { // > 20°C (templado)
    return 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)';
  } else if (temp > 283) { // > 10°C (fresco)
    return 'linear-gradient(135deg, #29b6f6 0%, #0288d1 100%)';
  } else { // frío
    return 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)';
  }
}

// Función para convertir Kelvin a Celsius
function kelvinToCelsius(kelvin: number | undefined) {
  if (!kelvin) return "N/A";
  return `${(kelvin - 273.15).toFixed(1)}°C`;
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

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card sx={{ minHeight: 180, boxShadow: 3 }}>
              <CardContent>
                <Skeleton variant="text" height={40} width="60%" />
                <Skeleton variant="text" height={20} width="40%" />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" height={30} width="20%" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Grid container spacing={3}>
        {cities?.map((card: CityCardData, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                minWidth: 275, 
                boxShadow: 3,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                height: '100%',
              }}
            >
              <CardActionArea 
                onClick={() => navigate(`/city`, { state: { city: card } })}
                sx={{ height: '100%' }}
              >
                <CardMedia
                  sx={{ 
                    height: 80, 
                    background: getBackgroundGradient(card.weather?.temp),
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 2
                  }}
                >
                  <Typography fontSize="small" variant="h6" component="div" fontWeight="bold">
                    {kelvinToCelsius(card.weather?.temp)}
                  </Typography>
                </Box>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="div" fontWeight="500">
                      {card.city_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" 
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon fontSize="small" />
                      {card.state}, {card.country}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, gap: 1 }}>
                    {getWeatherIcon(card.weather?.weather_description)}
                    <Chip 
                      label={card.weather?.weather_description || "Sin datos"} 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderRadius: 1,
                        background: 'rgba(0,0,0,0.05)',
                      }}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CityCards;