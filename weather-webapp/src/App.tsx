import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from './features/appbar/AppBar'
import PersistLogin from './features/sessions/PersistLogin'
import PrivateRoute from './features/routes/PrivateRoute'
import Dashboard from './features/dashboard/Dashboard'
import Logout from './features/sessions/Logout'
import Login from './features/sessions/Login'
import PublicOnlyRoute from './features/routes/PublicOnlyRoute'
import CityDetails from './features/dashboard/CityDetails'
import theme from './theme'
import { motion } from 'framer-motion'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <header className="App-header">
            <AppBar />
          </header>
          <Box
            component={motion.main}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              backgroundColor: 'background.default',
              minHeight: 'calc(100vh - 64px)',
              py: 4
            }}
          >
            <Container maxWidth="lg">
              <Routes>
                <Route element={<PersistLogin />}>
                  <Route path="/" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/city" element={
                    <PrivateRoute>
                      <CityDetails />
                    </PrivateRoute>
                  } />
                  <Route path="/logout" element={
                    <PrivateRoute>
                      <Logout />
                    </PrivateRoute>
                  } />
                  <Route path="/login" element={
                    <PublicOnlyRoute>
                      <Login />
                    </PublicOnlyRoute> 
                  }/>
                </Route>
              </Routes>
            </Container>
          </Box>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
