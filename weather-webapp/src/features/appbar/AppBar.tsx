import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { motion } from 'framer-motion';

const pages: any[] = [];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const accessToken = useSelector((state : RootState) => state.session.accessToken);
  const loading = useSelector((state : RootState) => state.session.loading);
  const currentUser = useSelector((state : RootState) => state.session.currentUser);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event?.preventDefault();
    handleCloseUserMenu();
    navigate('/logout');
  }

  // Generar opciones para el menú de navegación móvil
  const getNavigationItems = () => {
    if (accessToken) {
      return [
        { 
          label: 'Dashboard', 
          onClick: () => navigate('/') 
        },
        { 
          label: 'Cerrar Sesión', 
          onClick: () => navigate('/logout') 
        }
      ];
    }
    return [
      { 
        label: 'Iniciar Sesión', 
        onClick: () => navigate('/login') 
      }
    ];
  };

  const navigationItems = getNavigationItems();

  // Preparar los enlaces de sesión para escritorio
  let sessionLinks;
  if (accessToken) {
    sessionLinks = <Box sx={{ flexGrow: 0 }}>
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Typography marginRight={2} marginTop={1} textAlign="center">{currentUser?.email}</Typography>
      <Tooltip title="Opciones de usuario">
        <IconButton 
          onClick={handleOpenUserMenu} 
          sx={{ p: 0 }}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar alt={currentUser?.email || 'Usuario'} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
    </Box>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
        <MenuItem 
          onClick={(event) => handleLogout(event)}
          component={motion.li}
          whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
        >
          <Typography textAlign="center">Cerrar Sesión</Typography>
        </MenuItem>
    </Menu>
  </Box>;
  } else if (!accessToken && !loading) {
    sessionLinks = <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <Button 
        color="inherit" 
        onClick={() => navigate('/login')}
        variant="outlined"
        sx={{ borderRadius: '20px', px: 2 }}
      >
        Iniciar Sesión
      </Button>
    </Box>;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center'
            }}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CloudIcon 
              sx={{ 
                mr: 1, 
                fontSize: '2rem',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
              }} 
              component={motion.svg}
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 1 
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              ClimaSphere
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="opciones de navegación"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              component={motion.button}
              whileTap={{ scale: 0.9 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* Mostrar información del usuario en el menú móvil si está autenticado */}
              {accessToken && (
                <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ width: 32, height: 32, mr: 1 }}
                      alt={currentUser?.email || 'Usuario'}
                    />
                    <Typography variant="subtitle1" noWrap>
                      {currentUser?.email}
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {/* Opciones de navegación */}
              {navigationItems.map((item, index) => (
                <MenuItem 
                  key={`nav-item-${index}`} 
                  onClick={() => {
                    handleCloseNavMenu();
                    item.onClick();
                  }}
                  component={motion.li}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                >
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              flexGrow: 1,
              alignItems: 'center' 
            }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CloudIcon 
              sx={{ 
                mr: 1,
                fontSize: '1.5rem',
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))'
              }}
              component={motion.svg}
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 1 
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                textShadow: '0px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              ClimaSphere
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Sesión para escritorio */}
          {sessionLinks}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
