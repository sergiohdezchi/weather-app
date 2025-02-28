import { useEffect, useState } from "react";
import { getCityDetails } from "../../api/weatherAPI";
import { Modal, Box, Typography, CircularProgress, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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

interface ForecastData {
    date: string;
    weather_description: string;
    min_temp: number;
    max_temp: number;
}

interface CityDetailsModalProps {
  city: CityCardData | null;
  onClose: () => void;
}

function CityDetailsModal({ city, onClose }: CityDetailsModalProps) {
  const accessToken = useSelector((state: RootState) => state.session.accessToken);
  const [cityDetails, setCityDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken || !city) return;

    const fetchCityDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCityDetails(
          accessToken,
          city?.city_slug,
          city?.state,
          city?.country,
          city?.latitude,
          city?.longitude
        );
        setCityDetails(response);
      } catch (err) {
        console.error(err);
        setError("Error fetching city details");
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [accessToken, city]);

  return (
    <Modal open={!!city?.city_name} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {cityDetails && (
          <>
            <Typography variant="h5" mb={2}>{city?.city_name} - Pronóstico</Typography>
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
                  {cityDetails.forecast.map((day: ForecastData, index: number) => (
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
            <Button onClick={onClose} sx={{ mt: 2, width: "100%" }} variant="contained">
              Cerrar
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default CityDetailsModal;