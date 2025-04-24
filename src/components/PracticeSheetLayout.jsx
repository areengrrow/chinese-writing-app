import React from 'react';
import Box from '@mui/material/Box';

export default function PracticeSheetLayout() {
  return (
    <Box
      sx={{
        width: '210mm', // A4 width
        height: '297mm', // A4 height
        border: '1px solid black',
        padding: 2,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '80%',
          height: '80%',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top large box */}
        <Box sx={{ flex: 3, borderBottom: '1px solid black' }}></Box>

        {/* 3 equally-sized bottom boxes */}
        <Box sx={{ flex: 1, borderBottom: '1px solid black' }}></Box>
        <Box sx={{ flex: 1, borderBottom: '1px solid black' }}></Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
}
