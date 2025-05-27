import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';

const LectureSelect = ({ value, onChange, options }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Category
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Category"
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

export default LectureSelect;
