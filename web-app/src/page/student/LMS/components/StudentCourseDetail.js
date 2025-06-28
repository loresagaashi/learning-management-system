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
  AccordionDetails
} from '@material-ui/core';
import { CourseService } from '../../../../service/CourseService';
import { LectureService } from '../../../../service/LectureService';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { Visibility as VisibilityIcon, ExpandMore as ExpandMoreIcon, Description as DescriptionIcon } from '@material-ui/icons';
import MaterialsList from '../../../../component/MaterialsList';

const courseService = new CourseService();
const lectureService = new LectureService();

export default function StudentCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

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
        setStudents([]); // Set empty array if API fails
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      console.error('Error details:', error.response?.data);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
                  <Card key={course.id} onClick={() => navigate(`/student/lms/course/${course.id}`)}>
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
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
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
            </CardContent>
          </Card>
        </Box>

        <Box style={{ width: '200px', flexShrink: 0 }}>
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