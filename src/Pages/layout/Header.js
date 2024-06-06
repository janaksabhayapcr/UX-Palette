import React, { useState } from 'react';
import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography, Menu, makeStyles } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import logo from '../../assets/Images/logos/pcr.png';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, position: 'sticky', top: '0', zIndex: 9999 }}>
        <AppBar sx={{ boxShadow: 0, position: 'sticky', top: 0, zIndex: 9999 }}>
          <Toolbar>
            {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={logo} alt="logo" className='d-block' />
            </Typography>
            <div>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Sign up</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
