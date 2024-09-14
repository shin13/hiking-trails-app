import { useState, useEffect } from 'react';
import axios from 'axios';

const useOpenStatus = () => {
  const [openStatus, setOpenStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpen = async () => {
      try {
        const response = await axios.get('https://data.moa.gov.tw/Service/OpenData/ForestRtOpen.aspx');
        const openStatus = response.data.map(status => ({
          "步道代碼": status.TRAILID,
          "步道名稱": status.TR_CNAME,
          "步道路況狀態": status.TR_TYP,
          "路況標題": status.Title,
          "路況內容": status.content,
          "訊息發佈日期": status.ANN_DATE,
          "訊息發佈單位": status.DEP_NAME,
        }));
        setOpenStatus(openStatus);
        setLoading(false);  // 在数据加载完成后设置 loading 为 false
      } catch (error) {
        console.error('Error fetching open status:', error);
        setLoading(false);  // 即使出错也要设置 loading 为 false
      }
    };
    fetchOpen();
  }, []);

  return { openStatus, loading };
};

export default useOpenStatus;
