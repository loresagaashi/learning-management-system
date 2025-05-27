import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';

const CoursesSelect = ({ value, onChange, options }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Courses
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="courses-select-label">Courses</InputLabel>
        <Select
          labelId="courses-select-label"
          id="courses-select"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="Courses" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={value.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CoursesSelect;
