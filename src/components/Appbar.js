import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function ButtonAppBar() {
  const history = useHistory();


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket Booking System
          </Typography>
          
          {history.location.pathname === '/TicketBook' && (
            <Button color="inherit" onClick={()=>{
              history.push('/');
              localStorage.clear();
            }}>Sign out</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
