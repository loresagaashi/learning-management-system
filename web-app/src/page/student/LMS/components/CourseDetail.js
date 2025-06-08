import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Paper 
} from '@mui/material';
import { CourseService } from '../../../../service/CourseService';

const courseService = new CourseService();

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState(null);
  const [professors, setProfessors] = React.useState([]);
  const [lectures, setLectures] = React.useState([]);
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course details
        const courseResponse = await courseService.findById(courseId);
        setCourse(courseResponse);

        // Fetch professors
        const professorsResponse = await courseService.getProfessorsByCourse(courseId);
        setProfessors(professorsResponse || []);

        // Fetch lectures
        const lecturesResponse = await courseService.getLecturesByCourse(courseId);
        setLectures(lecturesResponse || []);

        // Fetch students
        const studentsResponse = await courseService.getStudentsByCourse(courseId);
        setStudents(studentsResponse || []);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {course.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Course Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Information
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {course.description}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Professors:</Typography>
                <Typography variant="body1" color="text.secondary">
                  {professors.length > 0 ? professors.join(', ') : 'No professors'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Lectures */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lectures
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {lectures.map((lecture) => (
                  <Typography key={lecture.id} variant="body1" color="text.secondary">
                    {lecture.name}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Students */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Students
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {students.map((student) => (
                  <Typography key={student.id} variant="body1" color="text.secondary">
                    {student.firstName} {student.lastName}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetail;
