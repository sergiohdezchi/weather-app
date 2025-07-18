import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { 
  Card, Box, CardContent, Typography, Grid, 
  Skeleton, CardMedia, CardActionArea, Chip, Divider,
  TextField, InputAdornment, Pagination, Paper, IconButton,
  CircularProgress, Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCityWeather, setSearchTerm, setCurrentPage } from "./citySlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
  const currentPage = useSelector((state: RootState) => state.cities.currentPage);
  const totalPages = useSelector((state: RootState) => state.cities.totalPages);
  const totalCount = useSelector((state: RootState) => state.cities.totalCount);
  const searchTerm = useSelector((state: RootState) => state.cities.searchTerm);
  const navigate = useNavigate();
  
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Efecto para debounce de la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);
  
  // Efecto para actualizar el estado de búsqueda
  useEffect(() => {
    if (debouncedSearch !== searchTerm) {
      dispatch(setSearchTerm(debouncedSearch));
    }
  }, [debouncedSearch, dispatch, searchTerm]);
  
  // Efecto para cargar ciudades
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCityWeather({ 
        token: accessToken,
        city: searchTerm,
        page: currentPage 
      }));
    }
  }, [accessToken, dispatch, searchTerm, currentPage]);
  
  // Manejar cambio de página
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };
  
  // Manejar cambio en la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  
  // Limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchInput('');
    dispatch(setSearchTerm(''));
  };

  // Renderizado de esqueletos durante la carga
  if (loading) {
    return (
      <>
        <Box sx={{ mb: 4 }}>
          <TextField 
            fullWidth
            disabled
            placeholder="Buscando ciudades..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
      </>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      {/* Barra de búsqueda */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 4, 
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar ciudades..."
          value={searchInput}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchInput && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} edge="end" size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 8,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            }
          }}
        />
      </Paper>
      
      {/* Mensaje de resultados */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2 
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Typography variant="body2" color="text.secondary">
          {totalCount > 0 ? 
            `Mostrando ${cities?.length} de ${totalCount} resultados` : 
            'No se encontraron resultados'}
        </Typography>
        {searchTerm && (
          <Chip 
            label={`Búsqueda: "${searchTerm}"`}
            onDelete={handleClearSearch}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {/* Listado de tarjetas */}
      <Grid container spacing={3}>
        {cities?.length > 0 ? (
          cities.map((card: CityCardData, index: number) => (
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
          ))
        ) : (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8, 
                px: 2,
                backgroundColor: 'rgba(0,0,0,0.02)',
                borderRadius: 2
              }}
            >
              <CloudIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No se encontraron ciudades
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Intenta con otro término de búsqueda
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      
      {/* Paginación */}
      {totalPages > 1 && (
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center"
          sx={{ mt: 4 }}
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1,
              }
            }}
          />
        </Stack>
      )}
    </>
  );
}

export default CityCards;