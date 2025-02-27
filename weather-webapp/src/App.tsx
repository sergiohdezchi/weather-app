import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import AppBar from './features/appbar/AppBar'
import PersistLogin from './features/sessions/PersistLogin'
import PrivateRoute from './features/routes/PrivateRoute'
import Dashboard from './features/dashboard/Dashboard'
import Logout from './features/sessions/Logout'
import Login from './features/sessions/Login'
import PublicOnlyRoute from './features/routes/PublicOnlyRoute'


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <header className="App-header">
            <AppBar />
          </header>
          <main>
            <Routes>
              <Route element={<PersistLogin />}>
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
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
          </main>
        </Router>
      </div>
    </>
  )
}

export default App
