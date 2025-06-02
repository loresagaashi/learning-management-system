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

const SemesterSelect = ({ value, onChange, generationName }) => {
  console.log('SemesterSelect received props:', { generationName, value });
  const { data: semesters } = useQuery(
    [QueryKeys.SEMESTER, generationName],
    () => semesterService.getSemestersByGeneration(generationName),
    { enabled: !!generationName }
  );

  console.log('Semesters data:', semesters);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Semester
      </Typography>
      <FormControl fullWidth variant="outlined" disabled={!generationName}>
        <InputLabel id="semester-select-label">Semester</InputLabel>
        <Select
          labelId="semester-select-label"
          id="semester-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Semester"
        >
          {semesters && semesters.length > 0 ? (
            semesters.map((semester) => {
              console.log('Rendering semester:', semester);
              return (
                <MenuItem key={semester.id} value={semester.name}>
                  {semester.name} - {semester.season}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem disabled>
              No semesters available
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SemesterSelect;
