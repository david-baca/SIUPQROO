import { Button, Container, ListItem, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Stack direction="row" spacing={2}>
          <ListItem>
            <Button
              component={Link}
              to="/Home"
              variant="contained"
              sx={{
                backgroundColor: 'blue',
                '&:hover': { backgroundColor: 'darkblue' },
                color: 'white',
                fontWeight: 'bold',
                py: 1,
                px: 4,
                borderRadius: 1
              }}>
              Home
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to="/About"
              variant="contained"
              sx={{
                backgroundColor: 'red',
                '&:hover': { backgroundColor: 'darkred' },
                color: 'white',
                fontWeight: 'bold',
                py: 1,
                px: 4,
                borderRadius: 1
              }}>
              About
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to="/Excel"
              variant="contained"
              sx={{
                backgroundColor: 'green',
                '&:hover': { backgroundColor: 'darkgreen' },
                color: 'white',
                fontWeight: 'bold',
                py: 1,
                px: 4,
                borderRadius: 1
              }}>
              Excel
            </Button>
          </ListItem>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
