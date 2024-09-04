import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 6, // 使用 4 * 8px（Material-UI 默認單位是 8px）來設置 2rem 的間距
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © 2024 Hiking Trails App
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
