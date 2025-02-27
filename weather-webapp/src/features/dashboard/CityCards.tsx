import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Card, Box, CardContent, Typography, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCities } from "../../api/weatherAPI";
import CityDetailsModal from "./CityDetailsModal";

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
  const accessToken = useSelector((state: RootState) => state.session.accessToken);
  const [cards, setCards] = useState<CityCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityCardData | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getCities(accessToken);
        setCards(response);
      } catch (err) {
        console.error(err);
        setError("Error fetching cards");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchCards();
    }
  }, [accessToken]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
    <Grid container spacing={3}>
      {cards.cities?.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ minWidth: 275, boxShadow: 3 }}
                onClick={() => setSelectedCity(card)} >
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
    
    <CityDetailsModal city={selectedCity}  onClose={() => setSelectedCity(null)} />
    </>
  );
}

export default CityCards;