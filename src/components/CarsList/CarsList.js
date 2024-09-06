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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

import CarsListStyle from "./CarsList.module.css";
import useApiGet from "../../hooks/useApi";

export default function CarsList() {
  const navigate = useNavigate();
  const { data, loading, error } = useApi("http://localhost:5000/cars");
  const [cars, setCars] = useState(data);

  const [dense, setDense] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <List dense={dense}>
          {cars.map((car) => {
            return (
              <ListItem
                key={car.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={(e) => {
                    e.preventDefault();
                    let newCars = cars.map((reg) => {
                      if (reg.id !== car.id) {
                        return (reg);
                      }
                    });
                    setCars(newCars);
                  }}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  display: "flex",
                  mb: "15px"
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
        <Box component="div" sx={{display: "flex"}}>
          <Button variant="outlined" sx={{margin: "auto"}} onClick={() => {setDialogOpen(true);}}>Adicionar Carro</Button>
        </Box>
      </Box>
      <Dialog 
        open={dialogOpen}
        onClose={() => {setDialogOpen(false);}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const brand = formJson.brand;
            const color = formJson.color;
            const name = formJson.name;
            const year = formJson.year;
            setDialogOpen(false);
          },
        }}
      >
        <DialogTitle>Novo Carro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para adicionar um novo carro HotWheels, por favor preencha o formulário.
          </DialogContentText>
          <TextField
            autoFocus={true}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="brand"
            name="brand"
            label="Marca"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="color"
            name="color"
            label="Cor"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            autoFocus={true}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="year"
            name="year"
            label="Ano de Fabricação"
            type="text"
            fullWidth={true}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDialogOpen(false);}}>Cancelar</Button>
          <Button type="submit">Enviar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}