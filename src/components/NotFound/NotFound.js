import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return(
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box component="div" sx={{margin: "auto", textAlign: "center"}}>
        <Typography gutterBottom variant="h3" component="div">
          404 Not Found
        </Typography>
        <Typography variant="body2" sx={{ color: 'red' }}>
          A página/requisição em questão não foi encontrada!
        </Typography>
      </Box>
    </Box>
  );
}