import React from "react";
import AboutStyle from "./About.module.css";

import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";

export default function About() {
	return (
    <Box className={AboutStyle.About}>
      <Card className={AboutStyle['About-card']} sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sobre
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Esta é uma aplicação para um CRUD de carros HotWheels.
          </Typography>
          <Typography variant="body2">
            Ela foi elaborada na Disciplina de Desenvolvimento de Sistemas Front-end do curso de graduação online da Pontifícia Universidade Católica do Rio Grande do Sul.
          </Typography>
        </CardContent>
      </Card>
    </Box>
	);
}
