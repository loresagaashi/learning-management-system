import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';

const DegreeLevelSelect = ({ value, onChange, options }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Degree Level
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="degree-level-select-label">Degree Level</InputLabel>
        <Select
          labelId="degree-level-select-label"
          id="degree-level-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Degree Level"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DegreeLevelSelect;