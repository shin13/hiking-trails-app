import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#3B7A57', // 深綠色
  // ... other styles
}));

function Navbar({ darkMode, setDarkMode }) {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#E0F2F1' }}> {/* 使用淺綠色文字 */}
          Hiking Trails
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "switch to light mode" : "switch to dark mode"}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
