import React, { useState, useEffect } from 'react';
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
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { SemesterService } from '../../../service/SemesterService';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../service/QueryKeys';
import { StudentSemesterService } from '../../../service/StudentSemesterService';
import useUser from '../../../hooks/useUser';

const semesterService = new SemesterService();
const studentSemesterService = new StudentSemesterService();

const SemesterRegistration = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [registeredSemesters, setRegisteredSemesters] = useState([]);

  const { user } = useUser();
  const studentId = user?.user?.id; // or user?.user?.studentId

  const { data: allSemesters } = useQuery(QueryKeys.SEMESTER, () =>
    semesterService.findAll()
  );

  // Fetch student's registered semesters on load
  useEffect(() => {
    if (studentId) {
      studentSemesterService
        .findByStudentId(studentId)
        .then((res) => {
          setRegisteredSemesters(res.data);
        })
        .catch(() => {
          setError('Failed to load registered semesters.');
        });
    }
  }, [studentId]);

  const handleRegister = () => {
    if (!selectedSemester) {
      setError('Please select a semester.');
      return;
    }

    if (!studentId) {
      setError('User not logged in or student ID missing.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    studentSemesterService
      .register(studentId, selectedSemester)
      .then((res) => {
        setMessage(res.data);
        // Refresh registered semesters
        return studentSemesterService.findByStudentId(studentId);
      })
      .then((res) => {
        setRegisteredSemesters(res.data);
      })
      .catch((err) => {
        setError(err.response?.data || 'Registration failed.');
      })
      .finally(() => setSubmitting(false));
  };

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

      {/* Show registered semesters below */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Registered Semesters
        </Typography>
        {registeredSemesters.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            You haven't registered in any semester yet.
          </Typography>
        ) : (
          <List>
            {registeredSemesters.map((sem) => (
              <ListItem key={sem.id}>
                <ListItemText primary={`${sem.semester.name} (${sem.semester.season})`} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default SemesterRegistration;
