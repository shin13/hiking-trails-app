import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import TrailTable from './components/TrailTable';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [trails, setTrails] = useState([]);
  const [openStatus, setOpenStatus] = useState([]); // 新增 openStatus 狀態

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    fetchTrails();
    fetchOpen();
  }, []);

  const fetchTrails = async () => {
    try {
      const response = await axios.get('https://data.moa.gov.tw/Service/OpenData/ForestRtBasic.aspx');
      const trails = response.data.map(trail => ({
        // 根据 API 数据结构提取相应信息，并将其存入新对象
        "步道名稱": trail.TR_CNAME, 
        "所在地": trail.TR_POSITION,
        "難度": trail.TR_DIF_CLASS, 
        "類型": trail.TR_PAVE,
        "長度": trail.TR_LENGTH,
        "海拔高度": trail.TR_ALT,
        "適合季節": trail.TR_BEST_SEASON,
        // ...其他需要显示的字段
      }));
      setTrails(trails);
    } catch (error) {
      console.error('Error fetching trails:', error);
    }
  };

  const fetchOpen = async () => {
    try {
      const response = await axios.get('https://data.moa.gov.tw/Service/OpenData/ForestRtOpen.aspx');
      const open = response.data.map(open => ({
        // 根据 API 数据结构提取相应信息，并将其存入新对象
        "步道代碼": open.TRAILID,
        "步道名稱": open.TR_CNAME, 
        "步道路況狀態": open.TR_TYP,
        "路況標題": open.Title, 
        "路況內容": open.content,
        "訊息發佈日期": open.ANN_DATE,
        "訊息發佈單位": open.DEP_NAME,
      }));
      setOpenStatus(open); // 使用 setOpenStatus 來設置狀態
    } catch (error) {
      console.error('Error fetching trails OPEN :', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <TrailTable trails={trails} openStatus={openStatus} /> {/* 將 openStatus 傳遞給 TrailTable */}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
