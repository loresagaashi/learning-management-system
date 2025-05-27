import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';

const SemesterSelect = ({ value, onChange, options }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Semester
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="semester-select-label">Semester</InputLabel>
        <Select
          labelId="semester-select-label"
          id="semester-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Semester"
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

export default SemesterSelect;
