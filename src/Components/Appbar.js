import * as React from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { Typography } from '@mui/material'; 
// import { Toolbar } from '@mui/material';

import { AppBar,Typography } from '@mui/material';


export default function TodoAppBar() {
  return (
    <AppBar position="static">
        <Typography variant="h4" align='center' style={{padding:"20px"}}>TO DO Application</Typography>
    </AppBar>

  );
}
