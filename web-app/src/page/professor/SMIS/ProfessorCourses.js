import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useUser from '../../../hooks/useUser';

const useStyles = makeStyles((theme) => ({
  coursesContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  card: {
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '1000px',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  coursesSection: {
    padding: theme.spacing(4),
  },
  courseItem: {
    marginBottom: theme.spacing(3),
  },
}));

const ProfessorCourses = () => {
  const classes = useStyles();
  const { user } = useUser();  // Assuming `user` is the logged-in professor
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.user.id) {
      console.error("No professor ID found");
      return;
    }

    // Fetch the professor's courses
    axios.get(`/professors/${user?.user.id}/courses`)
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <section className={classes.coursesContainer}>
      <Paper elevation={3} className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5"><b>Professor's Courses</b></Typography>
            <hr />
            {courses.length === 0 ? (
              <Typography>No courses assigned.</Typography>
            ) : (
              courses.map((course) => (
                <Grid item xs={12} key={course.id} className={classes.courseItem}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">Course: {course.name}</Typography>
                    <Typography variant="body2">Description: {course.description}</Typography>
                    {/* Add more course details if needed */}
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Paper>
    </section>
  );
};

export default ProfessorCourses;
