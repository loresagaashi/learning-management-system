import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';

const GenerationSelect = ({ value, onChange, options }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Generation
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="generation-select-label">Generation</InputLabel>
        <Select
          labelId="generation-select-label"
          id="generation-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Generation"
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

export default GenerationSelect;
