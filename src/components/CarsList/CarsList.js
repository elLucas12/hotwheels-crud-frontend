import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CircularProgress, 
  Typography,
  Box,
  Grid2 as Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Button
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

import CarsListStyle from "./CarsList.module.css";
import useApi from "../../hooks/useApi";

export default function CarsList() {
  const navigate = useNavigate();
  const { data, loading, error } = useApi("http://localhost:5000/cars");
  const [dense, setDense] = useState(false);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography variante="body1" sx={{color: "red"}}>{error}</Typography>
  }

  return (
    <Box component="div" className={CarsListStyle['CarsList']}>
      <Box component="div" sx={{margin: "auto", textAlign: "center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Lista de Carros
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Estes são os carros registrados até o momento.
        </Typography>
      </Box>
      <Box component="div" sx={{margin: "auto"}}>
        <Grid xs={12} md={6} lg={2}>
          <List dense={dense}>
            {data.map((car) => {
              return (
                <ListItem
                  key={car.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    display: "flex",
                    marginBottom: "15px"
                  }}
                  >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={car.name + " - " + car.brand}
                    secondary={null}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Box component="div" sx={{display: "flex"}}>
          <Button variant="outlined" sx={{margin: "auto"}} onClick={() => {alert("hao");}}>Adicionar Carro</Button>
        </Box>
      </Box>
    </Box>
  );
}