import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useUser from '../../../hooks/useUser';

const useStyles = makeStyles((theme) => ({
  gradesContainer: {
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
  gradesSection: {
    padding: theme.spacing(4),
  },
  gradeItem: {
    marginBottom: theme.spacing(3),
  },
}));

const StudentGrades = () => {
  const classes = useStyles();
  const { user } = useUser();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.user.id) {
      console.error("No student ID found");
      return;
    }

    // Fetch the student's grades
    axios.get(`/students/${user?.user.id}/grades`)
      .then(response => {
        setGrades(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching grades:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <section className={classes.gradesContainer}>
      <Paper elevation={3} className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5"><b>Student Grades</b></Typography>
            <hr />
            {grades.length === 0 ? (
              <Typography>No grades available.</Typography>
            ) : (
              grades.map((grade) => (
                <Grid item xs={12} key={grade.id} className={classes.gradeItem}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">Lecture: {grade?.lecture?.name}</Typography>
                    <Typography variant="body2">Date: {grade?.lecture?.lectureDate}</Typography>
                    <Typography variant="body2">Topic: {grade?.lecture?.topic}</Typography>
                    <Typography variant="body2">Grade: {grade?.grade}</Typography>
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

export default StudentGrades;
