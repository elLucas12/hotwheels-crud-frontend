import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { Typography, Container } from '@mui/material';

import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import CarForm from './components/CarForm/CarForm';
import CarsList from './components/CarsList/CarsList';
import CarDetail from './components/CarDetail/CarDetail';
import NotFound from './components/NotFound/NotFound';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Container className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cars-list" element={<CarsList />} />
            <Route path="/car-form" element={<CarForm />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/car/:id" element={<CarDetail />} />
          </Routes>
        </Container>
        <footer className="App-footer">
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} Lucas Zunho - Feito com ReactJS
          </Typography>
        </footer>
      </div>
    </Router>
  );
}
