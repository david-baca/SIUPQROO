import GoogleIcon from '@mui/icons-material/Google';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../assets/styles/Login.css';
import LogoUPQROO from '../../public/logoUPQROO.png';

import { useAuth } from '../context/AuthContext.js';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async (e: any) => {
    e.preventDefault();

    if (!auth) {
      console.error('Auth context is not available');
      return;
    }

    try {
      await auth.loginWithGoogle();

      const { email } = auth.user || {};

      if (!email) return;

      const arrayResults = email.split('@');

      if (arrayResults[1] !== 'upqroo.edu.mx') {
        console.log('No eres estudiante');
        await auth.logout();
      } else {
        const from = location.state?.from?.pathname || '/Home';
        navigate(from);
        console.log('Bienvenido');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '85vh',
          '& > :not(style)': {
            m: 2,
            width: { xs: '90%', sm: 400 },
            height: { xs: 'auto', sm: 300 }
          }
        }}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2
          }}>
          <img
            className="logoLogin"
            src={LogoUPQROO}
            alt="Logo UPQROO"
            style={{ padding: '15px' }}
          />
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={10}>
              <h2>Iniciar Sesión</h2>
              <a>Con una cuenta institucional(@upqroo.edu.mx)</a>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={10} md={10} style={{ marginTop: '25px' }}>
              <Button
                startIcon={<GoogleIcon />}
                variant="outlined"
                className="btnGoogleLogin"
                onClick={(e) => handleGoogle(e)}>
                Iniciar sesión Google
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Login;
