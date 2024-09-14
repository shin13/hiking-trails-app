import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';


const OuterContainer = styled('div')({
  display: 'flex', // 使用 flexbox 布局
  justifyContent: 'center', // 將內容居中
  width: '100%', // 全寬度容器以便居中
});


const TableWrapper = styled('div')({
  width: '80%',
  maxWidth: '1220px',
  '& .MuiTableContainer-root': {
    maxHeight: '80vh', // 使用视窗高度的百分比
    overflowY: 'auto', 
  },
});


const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: '20px 0',
}));


const SearchInput = styled(TextField)(({ theme }) => ({
  marginRight: '10px',
}));


const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 440,
}));


const ClearButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#3B7A57' : '#E0F2F1', // light mode 与 navbar 相同，dark mode 浅绿色
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? '#2E6349' : '#CCE8E7', // hover 状态下颜色加深
  },
}));


function TrailTable({ trails, openStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');    
    }
  };

  const filteredTrails = trails.filter(trail =>
    Object.values(trail).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const sortedTrails = [...filteredTrails].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });


  const highlightText = (text, highlight) => {
    const safeText = text ? text.toString() : '';
    const parts = safeText.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <mark key={index}>{part}</mark> : part
    );  
  };


  // 給表格中的數據加上路況的資訊
  const trailsWithStatus = sortedTrails.map(trail => {
    const status = openStatus.find(open => open['步道代碼'] === trail['步道代碼']);
    return {
      ...trail,
      '步道路況狀態': status ? status['步道路況狀態'] : '',
      '訊息發佈日期': status ? status['訊息發佈日期'] : '',
    };
  });

  return (
    <OuterContainer>
      <TableWrapper>
        <SearchContainer>
          <SearchInput
            label="搜尋關鍵字"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ClearButton variant="contained" color="primary" onClick={() => setSearchTerm('')}>
            清除
          </ClearButton>
        </SearchContainer>
        <CustomTableContainer component={Paper}>
        <Table stickyHeader>
            <TableHead>
              <TableRow>
                {['步道名稱', '步道路況狀態', '所在地', '難度', '長度', '海拔高度', '適合季節'].map((column) => (
                  <TableCell key={column} onClick={() => handleSort(column)}>
                    {column} {sortColumn === column && (sortDirection === 'asc' ? '▲' : '▼')}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {trailsWithStatus.map((trail) => (
                <TableRow key={trail['步道代碼']}>
                  <TableCell>{highlightText(trail['步道名稱'], searchTerm)}</TableCell>
                  {/* <Tooltip title={trail['訊息發佈日期'] ? `發佈日期: ${trail['訊息發佈日期']}` : ''}>
                    <TableCell>{highlightText(trail['步道路況狀態'], searchTerm)}</TableCell>
                  </Tooltip>   */}
                  <TableCell>{highlightText(trail['步道路況狀態'], searchTerm)}</TableCell>
                  <TableCell>{highlightText(trail['所在地'], searchTerm)}</TableCell>
                  <TableCell>{highlightText(trail['難度'], searchTerm)}</TableCell>
                  <TableCell>{highlightText(trail['長度'], searchTerm)}</TableCell>
                  <TableCell>{highlightText(trail['海拔高度'], searchTerm)}</TableCell>
                  <TableCell>{highlightText(trail['適合季節'], searchTerm)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CustomTableContainer>
      </TableWrapper>
    </OuterContainer>
  );
}

export default TrailTable;
