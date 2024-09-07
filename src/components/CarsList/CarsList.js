import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { BASE_URL } from "../../api";
import useApi from "../../hooks/useApi";

import {
  CircularProgress, 
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CarsListStyle from "./CarsList.module.css";
import CarsListAvatarImage from "./avatar.png";

export default function CarsList() {
  const navigate = useNavigate();
  const { data, loading, error } = useApi(BASE_URL);
  const [dense, setDense] = useState(false);
  const [addCarDialog, setAddCarDialog] = useState(false);
  const [deletedCarDialog, setDeletedCarDialog] = useState(false);

  if (loading) {
    return (
      <CircularProgress 
        sx={{ 
          position: "absolute", 
          left: 0, right: 0, top: 0, bottom: 0, 
          ml: "auto", mr: "auto", mt: "auto", mb: "auto" 
        }} 
      />
    );
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
          {data.map((car) => {
            return (
              <ListItem
                key={car.id}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={(e) => {
                      e.preventDefault();
                      /* Requisição DELETE com o ID do carro */
                      axios.delete(`${BASE_URL}/${car.id}`).then(() => {
                        setDeletedCarDialog(true);
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  display: "flex",
                  mb: "15px"
                }}
              >
                <ListItemButton 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/car/" + car.id);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={"Car " + car.name} src={CarsListAvatarImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={car.name + " - " + car.brand}
                    secondary={
                      <Link to={"/car/edit/" + car.id}>
                        <Typography variant="button">
                          editar
                        </Typography>
                      </Link>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box component="div" sx={{display: "flex"}}>
          <Button variant="outlined" sx={{margin: "auto"}} onClick={() => {setAddCarDialog(true);}}>Adicionar Carro</Button>
        </Box>
      </Box>

      {/* Dialogo com formulário, mostrado ao apertar o botão de novo veículo */}
      <Dialog 
        open={addCarDialog}
        onClose={() => {setAddCarDialog(false);}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();

            // Armazenando informações do formulário
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            // Sincronizando atualizações com a API
            axios.post(BASE_URL, formJson);
            setAddCarDialog(false);
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
          <Button onClick={() => {setAddCarDialog(false);}}>Cancelar</Button>
          <Button type="submit">Enviar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo mostrado ao deletar um veículo */}
      <Dialog 
        open={deletedCarDialog}
        onClose={() => {setDeletedCarDialog(false);}}
      >
        <DialogTitle>Remover Carro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Carro da HotWheels removido com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDeletedCarDialog(false);}}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}