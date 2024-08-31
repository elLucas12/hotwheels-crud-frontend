import React from "react";
import HomeStyle from "./Home.module.css";
import HotWheelsCardImage from './hotwheels-card.jpg';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
 } from "@mui/material";

function Home() {
  return (
    <Box className={HomeStyle.Home}>
      <Card className={HomeStyle['Home-card']} sx={{ maxWidth: 500 }}>
        <CardMedia component="img" height="340" sx={{ }} image={HotWheelsCardImage} title="Carro HotWheels" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            HotWheels
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Bem-vindo à coleção de HotWheels! 
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Home;