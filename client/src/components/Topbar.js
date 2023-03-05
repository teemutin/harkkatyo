import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
//render topbar with all the links and buttons, with mui
//built on https://mui.com/material-ui/react-app-bar/ example
function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Button component={Link} to="/"color="inherit">Home</Button> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Codesnippet site
          </Typography>
          
          <Button component={Link} to="/register"color="inherit">Register</Button>
             
        </Toolbar>
      </AppBar>
    </Box>
  );
}
//<Button component={Link} to="/login"color="inherit">Login</Button> 
//<Button color="inherit">Login</Button>
export default ButtonAppBar;