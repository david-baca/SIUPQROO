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
import Button from '@mui/material/Button';
import { Select, FormControl, InputLabel } from '@mui/material';
import logo from '../../public/logoUPQROO.png';
import seleccionCarrera from '../../public/SeleccionCarrera.png';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAuth } from '../context/AuthContext';

const settings = ['Perfil', 'Cuenta', 'Cerrar sesión'];

function SecretarioAcademico() {
  const auth = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [career, setCareer] = React.useState('');

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCareerChange = (event: SelectChangeEvent<string>) => {
    setCareer(event.target.value);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: (theme) => theme.shadows[4]
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
            <Box
              component="img"
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100px',
                height: 'auto',
                margin: '10px'
              }}
              alt="Logo Universidad Politecnica de Quintana Roo"
              src={logo}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configuración">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Imagen de usuario" src={auth?.user.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
      <Box
        sx={{
          padding: '30px 20px 10px',
          color: 'black',
          marginLeft: '20rem',
          '@media (max-width: 960px)': {
            marginLeft: 0
          }
        }}>
        <Typography variant="h5">
          Bienvenido {auth?.user.displayName}
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#f9f9f9'
          }}>
          <Box
            sx={{
              backgroundColor: '#800000',
              padding: '20px',
              color: 'white'
            }}>
            <Typography
              variant="h5"
              sx={{ textAlign: 'left', fontWeight: 'bold' }}>
              Desempeño
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '20px'
            }}>
            <Typography
              variant="h6"
              sx={{ textAlign: 'left', marginBottom: '16px' }}>
              Estás a punto de descargar los indicadores de la universidad
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, textAlign: 'left', marginBottom: '16px' }}>
              ¡Esperamos que esta información sea de gran utilidad para ti!
            </Typography>

            <FormControl variant="outlined" fullWidth sx={{ mb: 4 }}>
              <InputLabel id="career-label">Carrera</InputLabel>
              <Select
                labelId="career-label"
                id="select-carrer"
                value={career}
                onChange={handleCareerChange}
                label="Carrera">
                <MenuItem
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#FFDAB9'
                    },
                    '&:hover': {
                      backgroundColor: '#FFA500'
                    }
                  }}
                  value={10}>
                  Ingeniería en software
                </MenuItem>
                <MenuItem
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#FFDAB9'
                    },
                    '&:hover': {
                      backgroundColor: '#FFA500'
                    }
                  }}
                  value={30}>
                  Ingeniería financiera
                </MenuItem>
                <MenuItem
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#FFDAB9'
                    },
                    '&:hover': {
                      backgroundColor: '#FFA500'
                    }
                  }}
                  value={20}>
                  Ingeniería biomédica
                </MenuItem>
                <MenuItem
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#FFDAB9'
                    },
                    '&:hover': {
                      backgroundColor: '#FFA500'
                    }
                  }}
                  value={40}>
                  Ingeniería en biotecnología
                </MenuItem>
                <MenuItem
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#FFDAB9'
                    },
                    '&:hover': {
                      backgroundColor: '#FFA500'
                    }
                  }}
                  value={50}>
                  Licenciatura en terapia física
                </MenuItem>
                <MenuItem
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#FFDAB9'
                    },
                    '&:hover': {
                      backgroundColor: '#FFA500'
                    }
                  }}
                  value={60}>
                  Licenciatura en administración y gestión empresarial
                </MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Box
                sx={{
                  width: '45%',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                <img
                  src={seleccionCarrera}
                  alt="Imagen"
                  style={{ maxWidth: '100%' }}
                />
              </Box>
              <Box sx={{ width: '50%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    backgroundColor: '#FF8C00',
                    width: '100%'
                  }}>
                  Descargar indicador Enero - Abril 2020
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    backgroundColor: '#FF8C00',
                    width: '100%'
                  }}>
                  Descargar indicador Mayo - Agosto 2020
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    backgroundColor: '#FF8C00',
                    width: '100%'
                  }}>
                  Descargar indicador Enero - Abril 2021
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: '200px' }} />
      </Container>
    </>
  );
}

export default SecretarioAcademico;
