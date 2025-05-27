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
  OutlinedInput,
  CircularProgress
} from '@mui/material';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { CourseService } from '../../../../service/CourseService';

const courseService = new CourseService();

const CoursesSelect = ({ value, onChange }) => {
  const { data: courses = [], isLoading, isError } = useQuery(
    QueryKeys.COURSE,
    () => courseService.findAll()
  );

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
          disabled={isLoading || isError}
        >
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
              Loading...
            </MenuItem>
          ) : isError ? (
            <MenuItem disabled>Error loading courses</MenuItem>
          ) : (
            courses.map((course) => (
              <MenuItem key={course.id} value={course.name}>
                <Checkbox checked={value.indexOf(course.name) > -1} />
                <ListItemText primary={course.name} />
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      {isError && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          Failed to load courses. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default CoursesSelect;
