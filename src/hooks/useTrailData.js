import { useState, useEffect } from 'react';
import axios from 'axios';

const useTrailData = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await axios.get('https://data.moa.gov.tw/Service/OpenData/ForestRtBasic.aspx');
        const trails = response.data.map(trail => ({
          "步道代碼": trail.TRAILID,
          "步道名稱": trail.TR_CNAME,
          "步道分類": trail.TR_CLASS,
          "步道主系統": trail.TR_MAIN_SYS,
          "步道子系統": trail.TR_SUB_SYS,
          "管理單位": trail.TR_ADMIN,
          "洽詢電話": trail.TR_ADMIN_PHONE,
          "所在地": trail.TR_POSITION,
          "步道入口": trail.TR_ENTRANCE,
          "長度": trail.TR_LENGTH,
          "海拔高度": trail.TR_ALT,
          "類型": trail.TR_PAVE,
          "難度": trail.TR_DIF_CLASS,
          "路程規劃": trail.TR_TOUR,
          "適合季節": trail.TR_BEST_SEASON,
          "首選景觀": trail.TR_SPECIAL,
        }));
        setTrails(trails);
        setLoading(false);  // 在数据加载完成后设置 loading 为 false
      } catch (error) {
        console.error('Error fetching trails:', error);
        setLoading(false);  // 即使出错也要设置 loading 为 false
      }
    };
    fetchTrails();
  }, []);

  return { trails, loading };
};

export default useTrailData;
