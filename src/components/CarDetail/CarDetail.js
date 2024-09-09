import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { BASE_URL, putCar } from "../../api";

import { 
  Box, 
  CircularProgress, 
  TextField, 
  Typography, 
  Button
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData, loading, error } = useApi(BASE_URL);
  const [car, setCar] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  // Seleção do carro conforme ID de parâmetro
  let selectedCar = null;
  if (car === null) {
    selectedCar = data.find((reg) => reg.id === Number(id));
    setCar(selectedCar);
  } else {
    selectedCar = car;
  }
  
  // Redireciona para página NotFound caso ID não exista
  if (!selectedCar) {
    navigate("/404");
    return <></>;
  }

  return(
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box component="div" sx={{margin: "auto", textAlign: "center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Detalhes de Carro
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Detalhes do Carro Índice "{selectedCar.id}"
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
          putCar({ ...formJson, id: Number(formJson.id) }, data, setData);
          setEditMode(false);
        }}
      >
        <Box sx={{display: "flex", flexDirection: "column"}}>
          <TextField
            autoFocus={false}
            required={true}
            margin="normal"
            id="id"
            name="id"
            label="Número de ID"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedCar.id}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            disabled={!editMode}
            autoFocus={true}
            required={true}
            margin="normal"
            id="brand"
            name="brand"
            label="Marca"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedCar.brand}
          />
          <TextField
            disabled={!editMode}
            autoFocus={true}
            required={true}
            margin="normal"
            id="color"
            name="color"
            label="Cor"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedCar.color}
          />
          <TextField
            disabled={!editMode}
            autoFocus={true}
            required={true}
            margin="normal"
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedCar.name}
          />
          <TextField
            disabled={!editMode}
            autoFocus={true}
            required={true}
            margin="normal"
            id="year"
            name="year"
            label="Ano de Fabricação"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedCar.year}
          />
        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Button 
            variant="outlined" 
            onClick={(e) => {
              e.preventDefault();
              navigate("/cars-list");
            }}
            sx={{mr: 1}}
          >
            Voltar
          </Button>
          {
            editMode ? 
              <> 
                <Button variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(!editMode);
                  }}
                  sx={{mr:0.25}}
                >Cancelar</Button>
                <Button variant="contained" endIcon={<EditIcon />} type="submit">Salvar</Button>
              </> : 
              <Button variant="outlined" endIcon={<EditIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(!editMode);
                }}
              >Editar Dados</Button>
          }
        </Box>
      </Box>
    </Box>
  );
}