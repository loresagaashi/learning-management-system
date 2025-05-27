import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  Box
} from '@mui/material';
import { EnumSelectTableCell } from '../../../../component/TableCells';

const DegreeLevelSelect = ({ value, onChange }) => {
  const errorRef = useRef({});
  
  // Define the degree type enum values
  const degreeTypeOptions = [
    { value: 'BACHELOR', label: 'Bachelor' },
    { value: 'MASTER', label: 'Master' },
  ];
  
  // Create props object similar to what material-table would pass to editComponent
  const tableProps = {
    value: value,
    onChange: onChange,
    columnDef: { field: 'degreeType', title: 'Degree Level' }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Degree Level
      </Typography>
      {EnumSelectTableCell(tableProps, errorRef, degreeTypeOptions)}
    </Box>
  );
};

export default DegreeLevelSelect;