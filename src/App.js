import React, { useState, useTransition } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import { Typography, Container } from '@mui/material';

import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import CarForm from './components/CarForm/CarForm';
import CarsList from './components/CarsList/CarsList';
import CarDetail from './components/CarDetail/CarDetail';
import NotFound from './components/NotFound/NotFound';

function RouterOld() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => { 
      setPage(url);
    });
  }

  const [listCarros, setListCarros] = useState([]);

  let content;
  let pageSplit = page.split('?');
  if (page === '/') {
    content = (
      <Home />
    );
  } else if (pageSplit[0] === '/about') {
    content = (
      <About />
    );
  } else if (pageSplit[0] === '/car-form') {
    if (pageSplit[1] === 'isSub') {
      content = (
        <CarForm listCarros={listCarros} setListCarros={setListCarros} isSub={true} navigate={navigate} />
      );
    } else {
      content = (
        <CarForm listCarros={listCarros} setListCarros={setListCarros} />
      );
    }
  } else if (pageSplit[0] === '/cars-list') {
    content = (
      <CarsList listCarros={listCarros} setListCarros={setListCarros} navigate={navigate} />
    );
  } else if (pageSplit[0] === '/car-detail') {
    if (pageSplit[1] && !isNaN(Number(pageSplit[1]))) {
      let carIdx = Number(pageSplit[1]);
      if (carIdx < listCarros.length) {
        content = (
          <CarDetail carroIdx={carIdx} listCarros={listCarros} setListCarros={setListCarros} navigate={navigate} />
        );
      } else {
        content = (
          <NotFound />
        );
      }
    } else {
      content = (
        <NotFound />
      );
    }
  } else {
    content = (
      <NotFound />
    );
  }

  return (
    <div className="App">
      <div style={{ paddingBottom: 45, opacity: isPending ? 0.5 : 1 }}>
        <NavBar navigate={navigate} />
      </div>
      <Container fixed>
        {content}
      </Container>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Lucas Zunho - Feito com ReactJS</p>
      </footer>
    </div>
  );
}

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
