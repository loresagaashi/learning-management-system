import React, { useState, useEffect, useCallback } from 'react';
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
  const [homeworkSubmissions, setHomeworkSubmissions] = React.useState([]);
  const [selectedLecture, setSelectedLecture] = React.useState(null);
  const [openLectureDialog, setOpenLectureDialog] = React.useState(false);
  const [lectureName, setLectureName] = React.useState('');
  const [lectureDescription, setLectureDescription] = React.useState('');
  const [lectureMaterials, setLectureMaterials] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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

      // Optionally fetch students, submissions...
    } catch (error) {
      console.error('Error fetching course data:', error);
      console.error('Error details:', error.response?.data); // Debug log
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
    if (lectureOrEvent?.nativeEvent || lectureOrEvent?.target) {
      lectureOrEvent = null;
    }
  
    if (lectureOrEvent) {
      setSelectedLecture(lectureOrEvent);
      setLectureName(lectureOrEvent.name);
      setLectureDescription(lectureOrEvent.description);
      setLectureMaterials(lectureOrEvent.materials || []);
    } else {
      setSelectedLecture(null);
      setLectureName('');
      setLectureDescription('');
      setLectureMaterials([]);
    }
  
    setOpenLectureDialog(true);
  };
  

  const handleEditLecture = (lecture) => {
    setSelectedLecture(lecture);
    setLectureName(lecture.name);
    setLectureDescription(lecture.description);
    setLectureMaterials(lecture.materials || []);
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

  const handleAddMaterial = () => {
    setLectureMaterials([...lectureMaterials, { name: '', url: '' }]);
  };

  const handleMaterialChange = (index, field, value) => {
    const materials = [...lectureMaterials];
    materials[index][field] = value;
    setLectureMaterials(materials);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadMaterial = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('courseId', courseId);

      const response = await courseService.uploadMaterial(formData);
      
      // Add the uploaded material to the list
      setLectureMaterials(prevMaterials => [
        ...prevMaterials,
        {
          name: selectedFile.name,
          url: response.url // Assuming the backend returns a URL for the uploaded file
        }
      ]);
      
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading material:', error);
    }
  };

  const handleSaveLecture = async () => {
    try {
      setLoading(true);
  
      const lectureData = {
        id: selectedLecture?.id,   // may be undefined if new
        name: lectureName,
        topic: lectureDescription,
        courseId: courseId
      };
  
      console.log('Saving lecture data:', lectureData); // Debug log
  
      if (lectureData.id) {
        await lectureService.updateLecture(lectureData);
        console.log('Lecture updated successfully'); // Debug log
      } else {
        const createdLecture = await lectureService.createLecture(lectureData);
        console.log('Lecture created successfully:', createdLecture); // Debug log
        
        // Test if we can fetch the created lecture by ID
        if (createdLecture && createdLecture.id) {
          console.log('Testing fetch of created lecture by ID:', createdLecture.id);
          try {
            const fetchedLecture = await lectureService.getLectureById(createdLecture.id);
            console.log('Successfully fetched created lecture:', fetchedLecture);
          } catch (fetchError) {
            console.error('Failed to fetch created lecture by ID:', fetchError);
          }
        }
      }
  
      console.log('Refreshing course data...'); // Debug log
      await fetchCourseData(); // refresh the data
      setOpenLectureDialog(false);
    } catch (error) {
      console.error('Error saving lecture:', error);
    } finally {
      setLoading(false);
    }
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

        await courseService.uploadHomework(formData);
        await fetchCourseData();
      };
      fileInput.click();
    } catch (error) {
      console.error('Error uploading homework:', error);
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
                {console.log('Rendering lectures, combinedLectures:', combinedLectures)} {/* Debug log */}
                {combinedLectures.length === 0 ? (
                  <Typography variant="body1" color="text.secondary" style={{ textAlign: 'center', padding: '20px' }}>
                    No lectures found. Click "Add Lecture" to create your first lecture.
                  </Typography>
                ) : (
                  combinedLectures.map((lecture) => (
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
                          {lecture.topic || 'Click to add lecture topic'}
                        </Typography>
                        <Box style={{ marginTop: '16px' }}>
                          <Typography variant="subtitle1">Materials:</Typography>
                          {lecture.materials?.map((material, index) => (
                            <Typography key={index} variant="body2" color="text.secondary">
                              <a href={material.url} target="_blank" rel="noopener noreferrer">
                                {material.name}
                              </a>
                            </Typography>
                          ))}
                        </Box>
                        <Box style={{ marginTop: '16px' }}>
                          <Typography variant="subtitle1">Homework Submissions:</Typography>
                          {homeworkSubmissions
                            .filter(sub => sub.lectureId === lecture.id)
                            .map(sub => (
                              <Typography key={sub.id} variant="body2" color="text.secondary">
                                {sub.student.firstName} {sub.student.lastName} - {sub.submissionDate}
                              </Typography>
                            ))}
                        </Box>
                        <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate(`/professor/lms/course/${courseId}/lecture/${lecture.id}/submissions`);
                            }}
                          >
                            View Submissions
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
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
                Students
              </Typography>
              <Box style={{ maxHeight: '300px', overflow: 'auto', marginTop: '8px' }}>
                {students.map((student) => (
                  <Box key={student.id} style={{ marginBottom: '4px', width: '100%' }}>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '0.875rem' }}>
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
              label="Topic"
              multiline
              rows={4}
              value={lectureDescription}
              onChange={(e) => setLectureDescription(e.target.value)}
              margin="normal"
            />
            <Box style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {lectureMaterials.map((material, index) => (
                <Box key={index} style={{ width: '100%', marginBottom: '8px' }}>
                  <TextField
                    fullWidth
                    label="Material Name"
                    value={material.name}
                    onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Material URL"
                    value={material.url}
                    onChange={(e) => handleMaterialChange(index, 'url', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </Box>
              ))}
              <input
                type="file"
                id="material-upload"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              <label htmlFor="material-upload">
                <Button
                  variant="outlined"
                  component="span"
                  style={{ marginTop: '8px' }}
                >
                  {selectedFile ? selectedFile.name : 'Upload Material'}
                </Button>
              </label>
              {selectedFile && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUploadMaterial}
                  style={{ marginTop: '8px' }}
                >
                  Upload
                </Button>
              )}
            </Box>
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