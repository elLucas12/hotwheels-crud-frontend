import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { BASE_URL, postCar } from "../../api";

import {
  Box,
  Typography, 
  CircularProgress,
  TextField,
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

export default function CarForm() {
  const { data, setData, loading, error } = useApi(BASE_URL);
  const [addCarDialog, setAddCarDialog] = useState(false);

  // Verificações de carregamento dos dados da API
  if (loading) {
    return(
      <CircularProgress 
        sx={{ 
          position: "absolute", 
          left: 0, right: 0, top: 0, bottom: 0, 
          ml: "auto", mr: "auto", mt: "auto", mb: "auto" 
        }}
      />
    );
  } else if (error) {
    return <Typography variante="body1" sx={{color: "red"}}>{error}</Typography>
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box component="div" sx={{margin: "auto", textAlign: "center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Adicionar Carro
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Preencha o formulário para adicionar carros
        </Typography>
      </Box>
      <Box 
        component="form" 
        sx={{
          margin: "auto",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          // Armazenando informações do formulário
          const formData = new FormData(e.currentTarget);
          let formJson = Object.fromEntries(formData.entries());

          // Atualizando informações locais e na API
          postCar(formJson, data, setData);
          setAddCarDialog(true);
          e.currentTarget.reset();
        }}
      >
        <Box sx={{display: "flex", flexDirection: "column"}}>
          <TextField
            autoFocus={true}
            required={true}
            margin="normal"
            id="brand"
            name="brand"
            label="Marca"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            autoFocus={false}
            required={true}
            margin="normal"
            id="color"
            name="color"
            label="Cor"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            autoFocus={false}
            required={true}
            margin="normal"
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            autoFocus={false}
            required={true}
            margin="normal"
            id="year"
            name="year"
            label="Ano de Fabricação"
            type="text"
            fullWidth={false}
            variant="standard"
          />
        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Button variant="contained" endIcon={<EditIcon />} type="submit">Cadastrar</Button>
        </Box>
      </Box>

      {/* Dialogo mostrado ao adicionar o carro */}
      <Dialog 
        open={addCarDialog}
        onClose={() => {setAddCarDialog(false);}}
      >
        <DialogTitle>Cadastro Concluído</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Carro da HotWheels cadastrado com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddCarDialog(false);
          }}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}