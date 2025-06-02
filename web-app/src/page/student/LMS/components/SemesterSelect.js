import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { SemesterService } from '../../../../service/SemesterService';

const semesterService = new SemesterService();

const SemesterSelect = ({ value, onChange }) => {
  const { data: semesters = [], isLoading, isError } = useQuery(
    QueryKeys.SEMESTER,
    () => semesterService.findAll()
  );

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
          disabled={isLoading || isError}
        >
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
              Loading...
            </MenuItem>
          ) : isError ? (
            <MenuItem disabled>Error loading semesters</MenuItem>
          ) : (
            semesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.name}>
                {semester.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      {isError && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          Failed to load semesters. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default SemesterSelect;
