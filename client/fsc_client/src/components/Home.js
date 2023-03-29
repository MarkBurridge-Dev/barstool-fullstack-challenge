import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SportsBasketballIcon from '@mui/icons-material/SportsBasketball.js';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball.js';

import MlbFeedWrapper from './mlbFeedWrapper.js'; 
import NbaFeedWrapper from './nbaFeedWrapper.js'; 

import '../styles/home.css';

import {
  Route,
  Routes,
  Link,
} from "react-router-dom";

const drawerWidth = 240;

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Boxscore Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <Link to='/nbaFeed'>
                <ListItem key="NBA" disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SportsBasketballIcon /> 
                    </ListItemIcon>
                    <ListItemText primary="NBA" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to='/mlbFeed'>
                <ListItem key="MLB" disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                     <SportsBaseballIcon />
                    </ListItemIcon>
                    <ListItemText primary="MLB" />
                  </ListItemButton>
                </ListItem>
              </Link>
        
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route exact path='/' element={<div>Select a feed on the left!</div>}/>
          <Route exact path='/nbaFeed' element={<NbaFeedWrapper/>}/>
          <Route exact path='/mlbFeed' element={<MlbFeedWrapper/>}></Route>
          <Route path="*" element={<div>Page Not found</div>}/>
        </Routes>
      </Box>
    </Box>
  );
}


