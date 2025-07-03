import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LectureSubmissions from './LectureSubmissions';
import AssignmentGrading from './AssignmentGrading';
import {
  Box,
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  TextField,
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
  Tab
} from '@material-ui/core';
import { CourseService } from '../../../../service/CourseService';
import { LectureService } from '../../../../service/LectureService';
import { AssignmentService } from '../../../../service/AssignmentService';
import { SubmissionService } from '../../../../service/SubmissionService';
import UserContext from '../../../../context/UserContext';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import CoursesSelect from './CoursesSelect';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, ExpandMore as ExpandMoreIcon, Assignment as AssignmentIcon, CheckCircle as CheckCircleIcon, Grade as GradeIcon } from '@material-ui/icons';
import FileUploadComponent from '../../../../component/FileUploadComponent';
import MaterialsList from '../../../../component/MaterialsList';

const courseService = new CourseService();
const lectureService = new LectureService();
const assignmentService = new AssignmentService();
const submissionService = new SubmissionService();

export default function ProfessorCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = React.useState(null);
  const [professors, setProfessors] = React.useState([]);
  const [lectures, setLectures] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [homeworkSubmissions, setHomeworkSubmissions] = React.useState([]);
  const [selectedLecture, setSelectedLecture] = React.useState(null);
  const [openLectureDialog, setOpenLectureDialog] = React.useState(false);
  const [lectureName, setLectureName] = React.useState('');
  const [lectureDescription, setLectureDescription] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [lectureMaterials, setLectureMaterials] = React.useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  
  // New state for assignments and submissions
  const [assignments, setAssignments] = React.useState([]);
  const [submissions, setSubmissions] = React.useState([]);
  const [openAssignmentDialog, setOpenAssignmentDialog] = React.useState(false);
  const [openSubmissionsDialog, setOpenSubmissionsDialog] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [assignmentTitle, setAssignmentTitle] = React.useState('');
  const [assignmentDescription, setAssignmentDescription] = React.useState('');
  const [assignmentDueDate, setAssignmentDueDate] = React.useState('');
  const [activeTab, setActiveTab] = React.useState(0);

  const combinedLectures = [...lectures];

  const { isLoading, isError, data: allCourses } = useQuery(
    QueryKeys.COURSE,
    () => courseService.findAll()
  );

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true);
      if (!courseId && allCourses && Array.isArray(allCourses) && allCourses.length > 0) {
        const firstCourse = allCourses[0];
        navigate(`/professor/lms/course/${firstCourse.id}`);
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
      console.log('Fetching lectures for courseId:', courseId); // Debug log
      const lecturesResponse = await lectureService.getLecturesByCourse(courseId);
      console.log('Raw lectures response:', lecturesResponse); // Debug log
      console.log('Fetched lectures:', lecturesResponse); // Debug log
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

      // Fetch all submissions
      try {
        const submissionsResponse = await submissionService.findAll();
        console.log('Submissions response:', submissionsResponse);
        console.log('Submissions response type:', typeof submissionsResponse);
        console.log('Is array:', Array.isArray(submissionsResponse));
        setSubmissions(Array.isArray(submissionsResponse) ? submissionsResponse : []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setSubmissions([]);
      }

    } catch (error) {
      console.error('Error fetching course data:', error);
      console.error('Error details:', error.response?.data); // Debug log
      setError('Failed to load course data');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, [courseId, allCourses, navigate]);

  React.useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/choice/sign-in');
  };

  const handleAddLecture = () => {
    setSelectedLecture(null);
    setLectureName('');
    setLectureDescription('');
    setSelectedFiles([]);
    setError(null);
    setOpenLectureDialog(true);
  };

  const handleEditLecture = async (lecture) => {
    setSelectedLecture(lecture);
    setLectureName(lecture.name);
    setLectureDescription(lecture.topic || '');
    setSelectedFiles([]);
    setError(null);
    setOpenLectureDialog(true);
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      setLoading(true);
      await lectureService.delete(lectureId);
      await fetchCourseData();
    } catch (error) {
      console.error('Error deleting lecture:', error);
      setError('Failed to delete lecture');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLecture = async () => {
    try {
      setLoading(true);
      setError(null);

      if (selectedLecture) {
        // Update existing lecture - send the full lecture object with course
        const lectureData = {
          id: selectedLecture.id,
          name: lectureName,
          topic: lectureDescription,
          course: course // Send the full course object instead of courseId
        };

        await lectureService.update(lectureData);
        console.log('Lecture updated successfully');

        // If there are new materials to upload, upload them
        if (selectedFiles.length > 0) {
          console.log('Uploading additional materials for existing lecture');
          for (const fileItem of selectedFiles) {
            const formData = new FormData();
            formData.append('file', fileItem.file);
            formData.append('lectureId', selectedLecture.id);
            formData.append('description', fileItem.description || '');
            
            await lectureService.uploadMaterialForLecture(formData);
          }
          console.log('Additional materials uploaded successfully');
        }
      } else {
        // Create new lecture with materials
        if (selectedFiles.length > 0) {
          // Create lecture with materials
          const formData = new FormData();
          formData.append('name', lectureName);
          formData.append('topic', lectureDescription);
          formData.append('courseId', courseId);
          
          for (const fileItem of selectedFiles) {
            formData.append('files', fileItem.file);
            formData.append('descriptions', fileItem.description || '');
          }
          
          await lectureService.createLectureWithMaterials(formData);
        } else {
          // Create lecture without materials
          const lectureData = {
            name: lectureName,
            topic: lectureDescription,
            course: course
          };
          await lectureService.create(lectureData);
        }
      }

      await fetchCourseData();
      setOpenLectureDialog(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error saving lecture:', error);
      setError('Failed to save lecture');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // New functions for assignment management
  const handleAddAssignment = () => {
    setSelectedAssignment(null);
    setAssignmentTitle('');
    setAssignmentDescription('');
    setAssignmentDueDate('');
    setError(null);
    setOpenAssignmentDialog(true);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentTitle(assignment.title || '');
    setAssignmentDescription(assignment.description || '');
    setAssignmentDueDate(assignment.dueDate ? assignment.dueDate.split('T')[0] : '');
    setError(null);
    setOpenAssignmentDialog(true);
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      setLoading(true);
      await assignmentService.delete(assignmentId);
      await fetchCourseData();
    } catch (error) {
      console.error('Error deleting assignment:', error);
      setError('Failed to delete assignment');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAssignment = async () => {
    try {
      setLoading(true);
      setError(null);

      const assignmentData = {
        title: assignmentTitle,
        description: assignmentDescription,
        dueDate: assignmentDueDate,
        course: course
      };

      if (selectedAssignment) {
        assignmentData.id = selectedAssignment.id;
        await assignmentService.update(assignmentData);
      } else {
        await assignmentService.create(assignmentData);
      }

      await fetchCourseData();
      setOpenAssignmentDialog(false);
    } catch (error) {
      console.error('Error saving assignment:', error);
      setError('Failed to save assignment');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenSubmissionsDialog(true);
  };

  const handleGradeSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenSubmissionsDialog(true);
  };

  const getSubmissionsForAssignment = (assignmentId) => {
    if (!Array.isArray(submissions)) {
      return [];
    }
    return submissions.filter(submission => submission.assignment?.id === assignmentId);
  };

  const handleUploadHomework = async (studentId, lectureId) => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId);
        formData.append('lectureId', lectureId);
        formData.append('courseId', courseId);

        // Note: This would need to be implemented in the backend
        // await courseService.uploadHomework(formData);
        console.log('Homework upload functionality needs backend implementation');
        await fetchCourseData();
      };
      fileInput.click();
    } catch (error) {
      console.error('Error uploading homework:', error);
    }
  };

  const handleFilesChange = (files) => {
    setSelectedFiles(files);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100vh', overflowY: 'auto' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                navigate(`/professor/lms/course/${course.id}`);
                setDrawerOpen(false);
              }}
              selected={courseId === course.id}
            >
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={course.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box style={{ display: 'flex', gap: '16px' }}>
        <Box style={{ width: '250px', flexShrink: 0 }}>
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
              <Box style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }}>
                {allCourses && Array.isArray(allCourses) && allCourses.map((course) => (
                  <Card key={course.id} onClick={() => navigate(`/professor/lms/course/${course.id}`)}>
                    <CardContent>
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                <Tab label="Lectures" />
                <Tab label="Assignments" />
              </Tabs>
              
              {activeTab === 0 && (
                <Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', marginTop: '16px' }}>
                    <Typography variant="h6" gutterBottom>
                      Lectures
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleAddLecture}
                    >
                      Add Lecture
                    </Button>
                  </Box>
                  <Box>
                    {console.log('Rendering lectures, combinedLectures:', combinedLectures)}
                    {combinedLectures.length === 0 ? (
                      <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center', padding: '20px' }}>
                        No lectures found. Click "Add Lecture" to create your first lecture.
                      </Typography>
                    ) : (
                      combinedLectures.map((lecture) => (
                        <Accordion key={lecture.id} style={{ marginBottom: '8px' }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                              <Typography variant="h6">
                                {lecture.name}
                              </Typography>
                              <Box>
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditLecture(lecture);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteLecture(lecture.id);
                                  }}
                                  color="secondary"
                                >
                                  <DeleteIcon />
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
                    <Button
                      variant="contained"
                      onClick={handleAddAssignment}
                      startIcon={<AssignmentIcon />}
                    >
                      Add Assignment
                    </Button>
                  </Box>
                  <Box>
                    {assignments.length === 0 ? (
                      <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center', padding: '20px' }}>
                        No assignments found. Click "Add Assignment" to create your first assignment.
                      </Typography>
                    ) : (
                      assignments.map((assignment) => {
                        const assignmentSubmissions = getSubmissionsForAssignment(assignment.id);
                        const submissionCount = assignmentSubmissions.length;
                        const isOverdue = new Date(assignment.dueDate) < new Date();
                        
                        return (
                          <Accordion key={assignment.id} style={{ marginBottom: '8px' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography variant="h6">
                                    {assignment.title}
                                  </Typography>
                                  <Chip 
                                    label={`${submissionCount} submissions`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                  {isOverdue && (
                                    <Chip 
                                      label="Overdue"
                                      size="small"
                                      color="error"
                                    />
                                  )}
                                </Box>
                                <Box>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewSubmissions(assignment);
                                    }}
                                    title="View Submissions"
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleGradeSubmissions(assignment);
                                    }}
                                    title="Grade Submissions"
                                    color="primary"
                                  >
                                    <GradeIcon />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditAssignment(assignment);
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteAssignment(assignment.id);
                                    }}
                                    color="secondary"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
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
                                <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                                  Submissions: {submissionCount} / {students.length} students
                                </Typography>
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

        <Box style={{ width: '200px', flexShrink: 0 }}>
          <Card style={{ width: '200px' }}>
            <CardContent style={{ padding: '8px' }}>
              <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
                Students
              </Typography>
              <Box style={{ maxHeight: '300px', overflow: 'auto', marginTop: '8px' }}>
                {students.map((student) => (
                  <Box key={student.id} style={{ marginBottom: '4px', width: '100%' }}>
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.875rem' }}>
                      {student.firstName} {student.lastName}
                    </Typography>
                    {lectures.map((lecture) => (
                      <Button
                        key={lecture.id}
                        variant="outlined"
                        onClick={() => handleUploadHomework(student.id, lecture.id)}
                        size="small"
                        style={{ marginTop: '4px', width: '100%' }}
                      >
                        Upload Homework
                      </Button>
                    ))}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Dialog open={openLectureDialog} onClose={() => setOpenLectureDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedLecture ? 'Edit Lecture' : 'Add New Lecture'}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '16px' }}>
            <TextField
              fullWidth
              label="Lecture Name"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Lecture Description/Topic"
              value={lectureDescription}
              onChange={(e) => setLectureDescription(e.target.value)}
              multiline
              rows={3}
              margin="normal"
            />
            
            <FileUploadComponent
              onFilesChange={handleFilesChange}
              files={selectedFiles}
              title="Lecture Materials"
              buttonText="Upload Materials"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLectureDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveLecture}
            disabled={loading || !lectureName.trim()}
          >
            {loading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assignment Dialog */}
      <Dialog open={openAssignmentDialog} onClose={() => setOpenAssignmentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAssignment ? 'Edit Assignment' : 'Add New Assignment'}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '16px' }}>
            <TextField
              fullWidth
              label="Assignment Title"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Assignment Description"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
              multiline
              rows={3}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={assignmentDueDate}
              onChange={(e) => setAssignmentDueDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignmentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveAssignment}
            disabled={loading || !assignmentTitle.trim() || !assignmentDueDate}
          >
            {loading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submissions Dialog */}
      <Dialog open={openSubmissionsDialog} onClose={() => setOpenSubmissionsDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          Grade Submissions for: {selectedAssignment?.title}
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: '16px' }}>
            {selectedAssignment && (
              <AssignmentGrading 
                assignmentId={selectedAssignment.id}
                assignmentTitle={selectedAssignment.title}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmissionsDialog(false)}>
            Close
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
};