import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Snackbar,
  Button
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AssignmentService } from '../../../service/AssignmentService';
import { CourseService } from '../../../service/CourseService';
import { QueryKeys } from '../../../service/QueryKeys';
import AssignmentGrading from './components/AssignmentGrading';

const assignmentService = new AssignmentService();
const courseService = new CourseService();

export default function AssignmentGradingPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Fetch courses
  const { data: courses, isLoading: coursesLoading } = useQuery(
    QueryKeys.COURSE,
    () => courseService.findAll()
  );

  // Fetch assignments for selected course
  const { data: assignments, isLoading: assignmentsLoading } = useQuery(
    [QueryKeys.ASSIGNMENT, selectedCourse],
    () => selectedCourse ? assignmentService.findByCourseId(selectedCourse) : [],
    {
      enabled: !!selectedCourse
    }
  );

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedAssignment(''); // Reset assignment selection
  };

  const handleAssignmentChange = (event) => {
    setSelectedAssignment(event.target.value);
  };

  const selectedAssignmentData = assignments?.find(a => a.id === selectedAssignment);

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Box style={{ padding: 24 }}>
      <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/professor/lms")}
          style={{ marginRight: 16 }}
        >
          Back to LMS
        </Button>
        <Typography variant="h4">
          Assignment Grading
        </Typography>
      </Box>

      <Paper style={{ padding: 24, marginBottom: 24 }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel>Select Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={handleCourseChange}
              disabled={coursesLoading}
            >
              {courses?.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 200 }}>
            <InputLabel>Select Assignment</InputLabel>
            <Select
              value={selectedAssignment}
              onChange={handleAssignmentChange}
              disabled={!selectedCourse || assignmentsLoading}
            >
              {assignments?.map((assignment) => (
                <MenuItem key={assignment.id} value={assignment.id}>
                  {assignment.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {!selectedCourse && (
        <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#e3f2fd' }}>
          <Typography variant="body1" color="primary">
            Please select a course to view its assignments.
          </Typography>
        </Paper>
      )}

      {selectedCourse && !selectedAssignment && (
        <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#e3f2fd' }}>
          <Typography variant="body1" color="primary">
            Please select an assignment to grade its submissions.
          </Typography>
        </Paper>
      )}

      {selectedAssignment && selectedAssignmentData && (
        <AssignmentGrading 
          assignmentId={selectedAssignment}
          assignmentTitle={selectedAssignmentData.title}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
} 