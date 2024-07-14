import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../public/logoUPQROO.png';
import { useAuth } from '../context/AuthContext';

const settings = ['Perfil', 'Cuenta', 'Cerrar sesión'];

function SecretarioAcademico() {
  const auth = useAuth();

  console.log(auth);
  

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        boxShadow: (theme) => theme.shadows[4]
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo grande para pantallas medianas y grandes */}
          <Box
            component="img"
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '15%',
              height: 'auto',
              margin: '10px'
            }}
            alt="Logo Universidad Politecnica de Quintana Roo"
            src={logo}
          />

          {/* Logo pequeño para pantallas pequeñas */}
          <Box
            component="img"
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100px', // Ajusta este tamaño según sea necesario
              height: 'auto',
              margin: '10px'
            }}
            alt="Logo Universidad Politecnica de Quintana Roo"
            src={logo}
          />

          {/* Espacio vacío para empujar el `` contenido a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Icono del perfil */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Imagen de usuario" src={auth?.user.photoURL}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SecretarioAcademico;
