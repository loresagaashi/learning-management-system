import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LectureSubmissions from './LectureSubmissions';
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
  Drawer
} from '@mui/material';
import { CourseService } from '../../../../service/CourseService';
import { LectureService } from '../../../../service/LectureService';
import UserContext from '../../../../context/UserContext';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import CoursesSelect from './CoursesSelect';

const lectureService = new LectureService();
const courseService = new CourseService();

export default function ProfessorCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = React.useState(null);
  const [professors, setProfessors] = React.useState([]);
  const [lectures, setLectures] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [selectedLecture, setSelectedLecture] = React.useState(null);
  const [openLectureDialog, setOpenLectureDialog] = React.useState(false);
  const [lectureName, setLectureName] = React.useState('');
  const [lectureDescription, setLectureDescription] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const combinedLectures = [...lectures];

  const fetchCourseData = async () => {
  try {
    setLoading(true);
    if (!courseId && allCourses?.length > 0) {
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
    const lecturesResponse = await lectureService.getLecturesByCourse(courseId);
    setLectures(lecturesResponse || []);

    // Optionally fetch students, submissions...
  } catch (error) {
    console.error('Error fetching course data:', error);
  } finally {
    setLoading(false);
  }
};

  const { isLoading, isError, data: allCourses } = useQuery(
    QueryKeys.COURSE,
    () => courseService.findAll()
  );

  React.useEffect(() => {
    fetchCourseData();
  }, [courseId, courses, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/choice/sign-in');
  };

  if (loading) {
    return (
      <Box style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleAddLecture = (lectureOrEvent) => {
    // Ignore event object if passed instead of lecture
    if (lectureOrEvent?.nativeEvent) {
      lectureOrEvent = null;
    }
  
    if (lectureOrEvent) {
      setSelectedLecture(lectureOrEvent);
      setLectureName(lectureOrEvent.name);
    } else {
      setSelectedLecture(null);
      setLectureName('');
    }
  
    setOpenLectureDialog(true);
  };
  

  const handleEditLecture = (lecture) => {
    setSelectedLecture(lecture);
    setLectureName(lecture.name);
    setOpenLectureDialog(true);
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      setLoading(true);
      await lectureService.deleteLecture(lectureId);
      await fetchCourseData();
    } catch (error) {
      console.error('Error deleting lecture:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  const handleSaveLecture = async () => {
    if (!lectureName.trim()) {
      alert('Please enter a lecture name');
      return;
    }

    try {
      setLoading(true);
      
      const lectureData = {
        id: selectedLecture?.id,
        name: lectureName,
        course: { id: parseInt(courseId, 10) },
        lectureDate: new Date().toISOString()
      };
  
      if (lectureData.id) {
        await lectureService.updateLecture(lectureData);
      } else {
        await lectureService.createLecture(lectureData);
      }
  
      // Reset form and refresh data
      setLectureName('');
      setSelectedLecture(null);
      await fetchCourseData();
      setOpenLectureDialog(false);
    } catch (error) {
      console.error('Error saving lecture:', error);
      alert('Failed to save lecture. Please try again.');
    } finally {
      setLoading(false);
    }
  };


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
          {courses.map((course) => (
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
              <Typography variant="body1" color="text.secondary">
                {course?.description || 'Select a course to view details'}
              </Typography>
              
              <Box style={{ marginTop: '16px' }}>
                <Typography variant="subtitle1">Professors:</Typography>
                <Typography variant="body1" color="text.secondary">
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
              {(Array.isArray(allCourses) ? allCourses : []).map((course) => (
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
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
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
                {combinedLectures.map((lecture) => (
                  <Card key={lecture.id} style={{ marginBottom: '8px' }}>
                    <CardContent>
                      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <Typography variant="h6">
                          {lecture.name}
                        </Typography>
                        <Box>
                          <IconButton onClick={() => handleAddLecture(lecture)}>
                          </IconButton>
                          <IconButton
                            onClick={() => navigate(`/professor/lms/course/${courseId}/lecture/${lecture.id}/submissions`)}
                            color="primary"
                          >
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {lecture.description || 'Click to add lecture'}
                      </Typography>
                    
                    </CardContent>
                  </Card>
                ))}
              </Box>
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
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '0.875rem' }}>
                      {student.firstName} {student.lastName}
                    </Typography>
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
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLectureDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveLecture}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
