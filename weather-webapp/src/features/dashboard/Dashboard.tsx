import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import CityCards from "./CityCards";
import CloudIcon from '@mui/icons-material/Cloud';

function Dashboard() {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1565c0 0%, #0288d1 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
        component={motion.div}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CloudIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="500">
            Clima Mundial
          </Typography>
          <Typography variant="subtitle1">
            Consulta el clima actual y pronóstico de tus ciudades favoritas
          </Typography>
        </Box>
      </Paper>
      <CityCards />
    </Box>
  );
}

export default Dashboard;