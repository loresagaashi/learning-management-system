import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { SemesterService } from '../../../service/SemesterService';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../service/QueryKeys';
import { StudentSemesterService } from '../../../service/StudentSemesterService';

const semesterService = new SemesterService();
const studentSemesterService = new StudentSemesterService();

const SemesterRegistration = ({ studentId }) => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

const { data: allSemesters } = useQuery(QueryKeys.SEMESTER, () =>
    semesterService.findAll(),
  );

 const handleRegister = () => {
  if (!selectedSemester) {
    setError('Please select a semester.');
    return;
  }

  setSubmitting(true);
  setError(null);
  setMessage(null);

  studentSemesterService.register(studentId, selectedSemester)
  .then(res => {
    setMessage(res.data);
  })
  .catch(err => {
    setError(err.response?.data || 'Registration failed.');
  });
};

  // if (isLoading) return <Box textAlign="center"><CircularProgress /></Box>;

  // if (isError) return <Alert severity="error">Error loading semesters: {fetchError.message}</Alert>;

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register in a Semester
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="semester-label">Select Semester</InputLabel>
        <Select
          labelId="semester-label"
          value={selectedSemester}
          label="Select Semester"
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {allSemesters && allSemesters.length > 0 ? (
            allSemesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name} ({semester.season})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No semesters available</MenuItem>
          )}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        disabled={submitting}
      >
        {submitting ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default SemesterRegistration;
