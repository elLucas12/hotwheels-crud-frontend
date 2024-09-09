import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AddIcon from "@mui/icons-material/Add";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navValue, setNavValue] = useState(location.pathname);

  function makeNavigation(newNavValue) {
    setNavValue(newNavValue);
    navigate(newNavValue);
  }

  return(
    <Box>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(e, newNavValue) => {
          e.preventDefault();
          makeNavigation(newNavValue);
        }}
      >
        <BottomNavigationAction value={"/"} label="Início" icon={<HomeIcon />} />
        <BottomNavigationAction value={"/about"} label="Sobre" icon={<InfoIcon />} />
        <BottomNavigationAction value={"/cars-list"} label="Carros" icon={<DirectionsCarIcon />} />
        <BottomNavigationAction value={"/car-form"} label="Adicionar" icon={<AddIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;