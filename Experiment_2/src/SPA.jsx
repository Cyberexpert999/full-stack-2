import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function NavButton({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      component={Link}
      to={to}
      sx={{
        color: 'white',
        mx: 1,
        borderBottom: isActive ? '2px solid #fff' : 'none'
      }}
    >
      {label}
    </Button>
  );
}

export default function SinglePageApp() {
  return (
    <BrowserRouter>
      
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #1976d2, #9c27b0)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            
          </Typography>

          <NavButton to="/" label="Home" />
          <NavButton to="/about" label="About" />
          <NavButton to="/contact" label="Contact" />
        </Toolbar>
      </AppBar>

    
      <Container sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Paper>
      </Container>
    </BrowserRouter>
  );
}
