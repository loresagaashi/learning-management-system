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
  const { data: semesters, isLoading, isError } = useQuery(
    [QueryKeys.SEMESTER, generationName], // Use generationName in query key
    () => {
      console.log("SemesterSelect: Fetching semesters for generationName:", generationName);
      return semesterService.findByGenerationNameGet(generationName); // No .then(res => res.data) here, SemesterService already returns data
    },
    { enabled: !!generationName } // Enable query when generationName is present
  );

  console.log(`SemesterSelect: Props received - generationName: '${generationName}'`);
  console.log(`SemesterSelect: React Query status - isLoading: ${isLoading}, isError: ${isError}`);
  if (semesters) {
    console.log("SemesterSelect: Fetched semesters:", semesters);
  }
  if (isError) {
    console.error("SemesterSelect: Error fetching semesters.");
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Semester
      </Typography>

      {console.log(`SemesterSelect: FormControl disabled state: !generationName (${!generationName}) || isLoading (${isLoading})`)}
      <FormControl fullWidth variant="outlined" disabled={!generationName || isLoading}>
        <InputLabel id="semester-select-label">Semester</InputLabel>
        <Select
          labelId="semester-select-label"
          id="semester-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Semester"
        >
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : isError ? (
            <MenuItem disabled>Error loading semesters</MenuItem>
          ) : semesters && semesters.length > 0 ? (
            semesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name} - {semester.season}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No semesters available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SemesterSelect;
