import { Typography } from "@mui/material";
import CityCards from "./CityCards";

function Dashboard() {
  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <CityCards />
    </section>
  );
}

export default Dashboard;