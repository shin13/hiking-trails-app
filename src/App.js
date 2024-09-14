import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';
import TrailTable from './components/TrailTable';
import Footer from './components/Footer';
import useTrailData from './hooks/useTrailData';
import useOpenStatus from './hooks/useOpenStatus';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';

function App() {
  useEffect(() => {
    ReactGA.initialize('9695750619');
  }, []);

  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location) => {
      ReactGA.pageview(location.pathname + location.search);
    });
    return unlisten;
  }, [history]);

  const [darkMode, setDarkMode] = useState(false);
  const { trails, loading: trailsLoading } = useTrailData();
  const { openStatus, loading: statusLoading } = useOpenStatus();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const isLoading = trailsLoading || statusLoading;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TrailTable trails={trails} openStatus={openStatus} />
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
