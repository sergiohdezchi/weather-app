import { 
  Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Typography, Box, Card, 
  CardContent, Grid, Divider, Skeleton, IconButton
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { clearForecast, fetchCityForecast } from "./forecastSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

// Función para determinar el background según la descripción del clima
function getWeatherBackground(description: string | undefined) {
  if (!description) return 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)';
  
  const desc = description.toLowerCase();
  if (desc.includes('sun') || desc.includes('clear')) 
    return 'linear-gradient(135deg, #ff9800 0%, #ffeb3b 100%)';
  if (desc.includes('cloud') || desc.includes('overcast')) 
    return 'linear-gradient(135deg, #78909c 0%, #b0bec5 100%)';
  if (desc.includes('rain') || desc.includes('drizzle')) 
    return 'linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)';
  if (desc.includes('thunder') || desc.includes('storm')) 
    return 'linear-gradient(135deg, #5c6bc0 0%, #7986cb 100%)';
  if (desc.includes('snow') || desc.includes('ice')) 
    return 'linear-gradient(135deg, #90caf9 0%, #e3f2fd 100%)';
  
  return 'linear-gradient(135deg, #29b6f6 0%, #81d4fa 100%)';
}

// Función para convertir Kelvin a Celsius
function kelvinToCelsius(kelvin: number | undefined) {
  if (!kelvin) return "N/A";
  return `${(kelvin - 273.15).toFixed(1)}°C`;
}

// Función para formatear fechas ISO a un formato más legible
function formatDate(isoDate: string | undefined) {
  if (!isoDate) return "N/A";
  
  // Crear objeto Date a partir del string ISO
  const date = new Date(isoDate);
  
  // Opciones de formateo
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  // Formatear la fecha en español
  return date.toLocaleDateString('es-ES', options);
}

const CityDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { city } = location.state || {}; 
    const accessToken = useSelector((state: RootState) => state.session.accessToken);
    const forecast = useSelector((state: RootState) => state.forecast.forecast);
    const loading = useSelector((state: RootState) => state.forecast.loading);
    const error = useSelector((state: RootState) => state.forecast.error);
    const fromLocation = (location.state as any)?.from;
    const previousLocation = fromLocation ? fromLocation : { pathname: '/'};
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    
    useEffect(() => {
        if (!city || !accessToken) {
          navigate("/");
          return;
        }
    
        dispatch(
          fetchCityForecast({
            token: accessToken,
            citySlug: city.city_slug,
            state: city.state,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
          })
        );
    
        return () => {
          dispatch(clearForecast());
        };
      }, [dispatch, accessToken, city, navigate]);

    if (loading) {
      return (
        <Box>
          <Box display="flex" alignItems="center" mb={3}>
            <IconButton onClick={() => navigate(previousLocation)} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Skeleton variant="text" width="60%" height={40} />
          </Box>
          <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    if (error) {
      return (
        <Box>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(previousLocation)} 
            sx={{ mb: 2 }} 
            variant="outlined"
          >
            Volver
          </Button>
          <Typography color="error" variant="h6">{error}</Typography>
        </Box>
      );
    }

    // Obtener el día seleccionado o el primero
    const selectedDayData = selectedDay !== null && forecast ? 
      forecast[selectedDay] : 
      (forecast && forecast.length > 0 ? forecast[0] : null);

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton 
            onClick={() => navigate(previousLocation)} 
            sx={{ mr: 1 }}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight="500">
            {city?.city_name}
          </Typography>
        </Box>

        {/* Tarjeta de detalles actuales */}
        {selectedDayData && (
          <Card 
            sx={{ 
              mb: 4, 
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3
            }}
            component={motion.div}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              sx={{ 
                height: 120, 
                background: getWeatherBackground(selectedDayData.weather_description),
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                p: 2
              }}
            >
              <Box 
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '5rem',
                  opacity: 0.3
                }}
              >
                {getWeatherIcon(selectedDayData.weather_description)}
              </Box>
              <Box textAlign="center" zIndex={1}>
                <Typography variant="h3" fontWeight="bold">
                  {kelvinToCelsius(selectedDayData.temp)}
                </Typography>
                <Typography variant="subtitle1">
                  {selectedDayData.weather_description}
                </Typography>
              </Box>
            </Box>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>
                      {city?.state}, {city?.country}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>
                      {formatDate(selectedDayData.date)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-around">
                    <Box textAlign="center">
                      <Box display="flex" alignItems="center" justifyContent="center" color="error.main">
                        <ArrowUpwardIcon fontSize="small" />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {kelvinToCelsius(selectedDayData.max_temp)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Máxima
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Box display="flex" alignItems="center" justifyContent="center" color="primary.main">
                        <ArrowDownwardIcon fontSize="small" />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {kelvinToCelsius(selectedDayData.min_temp)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Mínima
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Lista de días para seleccionar */}
        <Typography variant="h6" fontWeight="500" mb={2}>
          Pronóstico para los próximos días
        </Typography>
        <Box
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            mb: 3,
            '::-webkit-scrollbar': {
              height: '8px',
            },
            '::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '10px',
            },
          }}
        >
          {forecast && forecast.map((day, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 130,
                borderRadius: 2,
                cursor: 'pointer',
                boxShadow: selectedDay === index ? 3 : 1,
                border: selectedDay === index ? '2px solid' : 'none',
                borderColor: 'primary.main',
                flexShrink: 0,
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => setSelectedDay(index)}
              component={motion.div}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  {getWeatherIcon(day.weather_description)}
                </Box>
                <Typography variant="body2" fontWeight="bold" textAlign="center">
                  {formatDate(day.date)}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box textAlign="center">
                  <Typography variant="body2" color="error.main" display="inline">
                    {kelvinToCelsius(day.max_temp)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" display="inline">
                    {' / '}
                  </Typography>
                  <Typography variant="body2" color="primary.main" display="inline">
                    {kelvinToCelsius(day.min_temp)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Tabla detallada */}
        <Typography variant="h6" fontWeight="500" mb={2}>
          Detalles del pronóstico
        </Typography>
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 3, 
            maxWidth: "100%", 
            overflowX: "auto",
            borderRadius: 2,
            mb: 3
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>Fecha</TableCell>
                <TableCell sx={{ color: 'white' }}>Clima</TableCell>
                <TableCell sx={{ color: 'white' }}>Mínima</TableCell>
                <TableCell sx={{ color: 'white' }}>Máxima</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forecast && forecast.map((day, index) => (
                <TableRow 
                  key={index}
                  sx={{
                    backgroundColor: selectedDay === index ? 'rgba(21, 101, 192, 0.1)' : 'inherit',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                  onClick={() => setSelectedDay(index)}
                >
                  <TableCell>{formatDate(day.date)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getWeatherIcon(day.weather_description)}
                      <Typography variant="body2">
                        {day.weather_description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'primary.main' }}>
                    {kelvinToCelsius(day.min_temp)}
                  </TableCell>
                  <TableCell sx={{ color: 'error.main' }}>
                    {kelvinToCelsius(day.max_temp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
}

export default CityDetails