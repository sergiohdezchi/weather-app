import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { clearForecast, fetchCityForecast } from "./forecastSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";

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

    return (
        <>
            <Typography variant="h5" mb={2}>
                {city?.city_name} - Pronóstico
            </Typography>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper} sx={{ boxShadow: 3, maxWidth: "100%", overflowX: "auto" }}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell><Typography variant="h6">Fecha</Typography></TableCell>
                    <TableCell>Clima</TableCell>
                    <TableCell>Mín (K)</TableCell>
                    <TableCell>Máx (K)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {forecast && forecast.map((day, index) => (
                    <TableRow key={index}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.weather_description}</TableCell>
                    <TableCell>{day.min_temp}</TableCell>
                    <TableCell>{day.max_temp}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Button 
                onClick={() => navigate(previousLocation)} 
                sx={{ mt: 2, width: "100%" }} 
                variant="contained"
            >
                Volver
            </Button>
        </>
    )
    }

export default CityDetails