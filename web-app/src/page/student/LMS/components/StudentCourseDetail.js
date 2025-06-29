import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Paper,
  Button,
  IconButton,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';
import { CourseService } from '../../../../service/CourseService';
import { LectureService } from '../../../../service/LectureService';
import { AssignmentService } from '../../../../service/AssignmentService';
import { SubmissionService } from '../../../../service/SubmissionService';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { Visibility as VisibilityIcon, ExpandMore as ExpandMoreIcon, Description as DescriptionIcon, Assignment as AssignmentIcon, CloudUpload as UploadIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import MaterialsList from '../../../../component/MaterialsList';
import FileUploadComponent from '../../../../component/FileUploadComponent';
import useUser from '../../../../hooks/useUser';

const courseService = new CourseService();
const lectureService = new LectureService();
const assignmentService = new AssignmentService();
const submissionService = new SubmissionService();

export default function StudentCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [course, setCourse] = React.useState(null);
  const [professors, setProfessors] = React.useState([]);
  const [lectures, setLectures] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [lectureMaterials, setLectureMaterials] = React.useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  
  // New state for assignments and submissions
  const [assignments, setAssignments] = React.useState([]);
  const [submissions, setSubmissions] = React.useState([]);
  const [openSubmissionDialog, setOpenSubmissionDialog] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState(0);

  const { isLoading, isError, data: allCourses } = useQuery(
    QueryKeys.COURSE,
    () => courseService.findAll()
  );

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true);
      if (!courseId && allCourses && Array.isArray(allCourses) && allCourses.length > 0) {
        const firstCourse = allCourses[0];
        navigate(`/student/lms/course/${firstCourse.id}`);
        return;
      }

      if (!courseId) return; // no courseId, no fetch

      // Fetch course details
      const courseResponse = await courseService.findById(courseId);
      setCourse(courseResponse);
      setSelectedCourse(courseResponse);

      // Fetch professors
      const professorsResponse = await courseService.getProfessorsByCourse(courseId);
      setProfessors(professorsResponse || []);

      // Fetch lectures
      console.log('Fetching lectures for courseId:', courseId);
      const lecturesResponse = await lectureService.getLecturesByCourse(courseId);
      console.log('Fetched lectures:', lecturesResponse);
      setLectures(lecturesResponse || []);
      
      // Fetch materials for each lecture
      const materialsMap = {};
      for (const lecture of lecturesResponse) {
        try {
          const materials = await lectureService.getMaterialsByLecture(lecture.id);
          materialsMap[lecture.id] = materials;
        } catch (error) {
          console.error(`Error fetching materials for lecture ${lecture.id}:`, error);
          materialsMap[lecture.id] = [];
        }
      }
      setLectureMaterials(materialsMap);

      // Fetch students
      try {
        const studentsResponse = await courseService.getStudentsByCourse(courseId);
        setStudents(studentsResponse || []);
      } catch (error) {
        console.error('Error fetching students for course:', error);
        setStudents([]);
      }

      // Fetch assignments for this course
      try {
        const assignmentsResponse = await assignmentService.findByCourseId(courseId);
        setAssignments(assignmentsResponse || []);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setAssignments([]);
      }

      // Fetch student's submissions
      try {
        const submissionsResponse = await submissionService.findByStudentId(user?.user?.id);
        setSubmissions(submissionsResponse || []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setSubmissions([]);
      }

    } catch (error) {
      console.error('Error fetching course data:', error);
      console.error('Error details:', error.response?.data);
      setError('Failed to load course data');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, [courseId, allCourses, navigate, user?.user?.id]);

  React.useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/choice/sign-in');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // New functions for assignment and submission management
  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setSelectedFiles([]);
    setError(null);
    setOpenSubmissionDialog(true);
  };

  const handleSaveSubmission = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!selectedFiles.length) {
        setError('Please select at least one file to submit');
        setSnackbarOpen(true);
        return;
      }

      // Create submission data
      const submissionData = {
        assignment: selectedAssignment,
        student: { id: user?.user?.id },
        submissionDate: new Date().toISOString().split('T')[0]
      };

      // For now, we'll create a basic submission
      // In a real implementation, you'd upload files and get URLs
      const submission = await submissionService.create(submissionData);
      
      console.log('Submission created:', submission);
      
      await fetchCourseData();
      setOpenSubmissionDialog(false);
      setSelectedFiles([]);
      
      setError('Assignment submitted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting assignment:', error);
      setError('Failed to submit assignment');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const getStudentSubmission = (assignmentId) => {
    return submissions.find(submission => 
      submission.assignment?.id === assignmentId && 
      submission.student?.id === user?.user?.id
    );
  };

  const handleFilesChange = (files) => {
    setSelectedFiles(files);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading && !course) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h4" gutterBottom>
          {course?.name || 'Select a Course'}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {allCourses && Array.isArray(allCourses) && allCourses.map((course) => (
            <ListItem
              button
              key={course.id}
              onClick={() => {
                navigate(`/student/lms/course/${course.id}`);
                setDrawerOpen(false);
              }}
              selected={courseId === course.id}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={course.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box style={{ display: 'flex' }}>
        <Box style={{ width: '250px', flexShrink: 0, marginRight: '16px' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Information
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {course?.description || 'Select a course to view details'}
              </Typography>
              
              <Box style={{ marginTop: '16px' }}>
                <Typography variant="subtitle1">Professors:</Typography>
                <Typography variant="body1" color="textSecondary">
                  {professors.length > 0 ? professors.join(', ') : 'No professors'}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Other Courses
              </Typography>
              <Box style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {allCourses && Array.isArray(allCourses) && allCourses.map((course, index) => (
                  <Card key={course.id} onClick={() => navigate(`/student/lms/course/${course.id}`)} style={{ marginRight: '8px', marginBottom: '8px' }}>
                    <CardContent>
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1">
                          {course.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box style={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                <Tab label="Lectures & Materials" />
                <Tab label="Assignments" />
              </Tabs>
              
              {activeTab === 0 && (
                <Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', marginTop: '16px' }}>
                    <Typography variant="h6" gutterBottom>
                      Lectures & Materials
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => setDrawerOpen(true)}
                    >
                      Switch Course
                    </Button>
                  </Box>
                  <Box>
                    {console.log('Rendering lectures:', lectures)}
                    {lectures.length === 0 ? (
                      <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center', padding: '20px' }}>
                        No lectures available for this course yet.
                      </Typography>
                    ) : (
                      lectures.map((lecture) => (
                        <Accordion key={lecture.id} style={{ marginBottom: '8px' }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                              <Typography variant="h6">
                                {lecture.name}
                              </Typography>
                              <Box>
                                <IconButton
                                  size="small"
                                  disabled
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box width="100%">
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                {lecture.topic || 'No topic specified'}
                              </Typography>
                              <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                                Created: {new Date(lecture.createdOn).toLocaleDateString()}
                              </Typography>
                              
                              <Divider style={{ margin: '16px 0' }} />
                              
                              <Typography variant="subtitle2" gutterBottom>
                                Course Materials:
                              </Typography>
                              
                              <MaterialsList 
                                materials={lectureMaterials[lecture.id] || []}
                                showDelete={false}
                              />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    )}
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', marginTop: '16px' }}>
                    <Typography variant="h6" gutterBottom>
                      Assignments
                    </Typography>
                  </Box>
                  <Box>
                    {assignments.length === 0 ? (
                      <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center', padding: '20px' }}>
                        No assignments available for this course yet.
                      </Typography>
                    ) : (
                      assignments.map((assignment) => {
                        const studentSubmission = getStudentSubmission(assignment.id);
                        const isOverdue = new Date(assignment.dueDate) < new Date();
                        const isSubmitted = !!studentSubmission;
                        
                        return (
                          <Accordion key={assignment.id} style={{ marginBottom: '8px' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                <Box display="flex" alignItems="center" style={{ marginRight: '8px' }}>
                                  <Typography variant="h6">
                                    {assignment.title}
                                  </Typography>
                                  <Box style={{ marginLeft: '8px' }}>
                                    {isSubmitted ? (
                                      <Chip 
                                        label="Submitted"
                                        size="small"
                                        color="primary"
                                        icon={<CheckCircleIcon />}
                                      />
                                    ) : isOverdue ? (
                                      <Chip 
                                        label="Overdue"
                                        size="small"
                                        color="error"
                                      />
                                    ) : (
                                      <Chip 
                                        label="Pending"
                                        size="small"
                                        color="default"
                                      />
                                    )}
                                  </Box>
                                </Box>
                                <Box>
                                  {!isSubmitted && (
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSubmitAssignment(assignment);
                                      }}
                                      title="Submit Assignment"
                                      color="primary"
                                    >
                                      <UploadIcon />
                                    </IconButton>
                                  )}
                                </Box>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box width="100%">
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                  {assignment.description || 'No description specified'}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                                  Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                                </Typography>
                                
                                {isSubmitted && (
                                  <Box style={{ marginTop: '16px' }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Your Submission:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Submitted on: {new Date(studentSubmission.submissionDate).toLocaleDateString()}
                                    </Typography>
                                    {studentSubmission.fileUrl && (
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => window.open(studentSubmission.fileUrl, '_blank')}
                                        style={{ marginTop: '8px' }}
                                      >
                                        View Submission
                                      </Button>
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box style={{ width: '200px', flexShrink: 0, marginLeft: '16px' }}>
          <Card style={{ width: '200px' }}>
            <CardContent style={{ padding: '8px' }}>
              <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
                Classmates
              </Typography>
              <Box style={{ maxHeight: '300px', overflow: 'auto', marginTop: '8px' }}>
                {students.length === 0 ? (
                  <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.875rem' }}>
                    No students enrolled yet.
                  </Typography>
                ) : (
                  students.map((student) => (
                    <Box key={student.id} style={{ marginBottom: '4px', width: '100%' }}>
                      <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.875rem' }}>
                        {student.firstName} {student.lastName}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Submission Dialog */}
      <Dialog open={openSubmissionDialog} onClose={() => setOpenSubmissionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Submit Assignment: {selectedAssignment?.title}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '16px' }}>
            {selectedAssignment && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Assignment Details
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {selectedAssignment.description || 'No description'}
                </Typography>
                <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                  Due Date: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                </Typography>
                
                <Divider style={{ margin: '16px 0' }} />
                
                <Typography variant="h6" gutterBottom>
                  Upload Your Submission
                </Typography>
                
                <FileUploadComponent
                  onFilesChange={handleFilesChange}
                  files={selectedFiles}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmissionDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveSubmission}
            disabled={loading || selectedFiles.length === 0}
            color="primary"
          >
            {loading ? <CircularProgress size={20} /> : 'Submit Assignment'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
} 