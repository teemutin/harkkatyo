import React, {Suspense} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
//render topbar with all the links and buttons, with mui
//provides option to change language 
//built on top of https://mui.com/material-ui/react-app-bar/ example
function ButtonAppBar() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Button component={Link} to="/"color="inherit">{t("Home")}</Button>
            <Button component={Link} to="/register"color="inherit">{t("Register")}</Button> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button id="fi" color="inherit" onClick={() => changeLanguage("fi")}>Fi</Button>
          <Button id="en" color="inherit" onClick={() => changeLanguage("en")}>En</Button>
          
             
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <ButtonAppBar/>
        </Suspense>
    );
}