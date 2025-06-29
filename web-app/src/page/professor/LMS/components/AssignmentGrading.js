import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress
} from '@material-ui/core';
import { Edit, GetApp, CheckCircle, Cancel } from '@material-ui/icons';
import { AssignmentService } from '../../../../service/AssignmentService';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';

const assignmentService = new AssignmentService();

export default function AssignmentGrading({ assignmentId, assignmentTitle }) {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, error: fetchError } = useQuery(
    [QueryKeys.ASSIGNMENT_SUBMISSIONS, assignmentId],
    () => assignmentService.getAssignmentSubmissionsForGrading(assignmentId),
    {
      enabled: !!assignmentId
    }
  );

  const gradeMutation = useMutation(
    (data) => assignmentService.gradeAssignment(data.assignmentId, data.studentId, data.grade),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.ASSIGNMENT_SUBMISSIONS, assignmentId]);
        setGradeDialogOpen(false);
        setSelectedSubmission(null);
        setGrade('');
        setError('');
      },
      onError: (error) => {
        setError('Failed to save grade. Please try again.');
      }
    }
  );

  const handleGradeClick = (submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.grade ? submission.grade.toString() : '');
    setGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (!grade || isNaN(grade) || grade < 0 || grade > 100) {
      setError('Please enter a valid grade between 0 and 100');
      return;
    }

    gradeMutation.mutate({
      assignmentId: selectedSubmission.assignmentId,
      studentId: selectedSubmission.studentId,
      grade: parseInt(grade)
    });
  };

  const handleDownloadFile = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#ffebee' }}>
        <Typography variant="body1" color="error">
          Failed to load submissions. Please try again.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Grade Submissions - {assignmentTitle}
      </Typography>
      
      {submissions && submissions.length === 0 ? (
        <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#e3f2fd' }}>
          <Typography variant="body1" color="primary">
            No submissions found for this assignment.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions?.map((submission) => (
                <TableRow key={`${submission.assignmentId}-${submission.studentId}`}>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>{submission.studentEmail}</TableCell>
                  <TableCell>
                    {new Date(submission.submissionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {submission.submissionFileUrl && (
                      <Tooltip title="Download submission">
                        <IconButton
                          size="small"
                          onClick={() => handleDownloadFile(submission.submissionFileUrl)}
                        >
                          <GetApp />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    {submission.isGraded ? (
                      <Typography variant="body2" color="primary">
                        {submission.grade}/100
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Not graded
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {submission.isGraded ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Graded"
                        color="primary"
                        size="small"
                      />
                    ) : (
                      <Chip
                        icon={<Cancel />}
                        label="Pending"
                        color="default"
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={submission.isGraded ? "Edit grade" : "Grade submission"}>
                      <IconButton
                        size="small"
                        onClick={() => handleGradeClick(submission)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onClose={() => setGradeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Grade Assignment - {selectedSubmission?.studentName}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: 16 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Assignment: {selectedSubmission?.assignmentTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Course: {selectedSubmission?.courseName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Submission Date: {selectedSubmission?.submissionDate ? 
                new Date(selectedSubmission.submissionDate).toLocaleDateString() : 'N/A'}
            </Typography>
            
            <TextField
              fullWidth
              label="Grade (0-100)"
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              margin="normal"
              inputProps={{ min: 0, max: 100 }}
              error={!!error}
              helperText={error}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGradeDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveGrade} 
            variant="contained" 
            color="primary"
            disabled={gradeMutation.isLoading}
          >
            {gradeMutation.isLoading ? <CircularProgress size={20} /> : 'Save Grade'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 