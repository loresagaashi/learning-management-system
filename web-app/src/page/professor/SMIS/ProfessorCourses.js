import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import useUser from "../../../hooks/useUser";
import { ProfessorService } from "../../../service/ProfessorService";

const useStyles = makeStyles((theme) => ({
  coursesContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  card: {
    borderRadius: "1rem",
    width: "100%",
    maxWidth: "1000px",
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
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!user || !user.user?.id) {
    console.error("No professor ID found in user:", user);
    return;
  }

  const professorService = new ProfessorService();
  professorService
    .getCoursesByProfessorId(user.user.id)
    .then((courses) => {
      console.log("Courses fetched:", courses);
      setCourses(courses || []);  // set the state properly here
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
      setLoading(false);
    });
}, [user]);

  if (loading) {
    return <CircularProgress />;
  }
console.log("Courses state:", courses);

  return (
    <section className={classes.coursesContainer}>
     <Paper elevation={3} className={classes.card}>
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Typography variant="h5">
        <b>Professor's Courses</b>
      </Typography>
      <hr />
    </Grid>

  {Array.isArray(courses) && courses.length > 0 ? (
  courses.map((course) => (
    <Grid item xs={12} key={course.id}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6">Course: {course.name}</Typography>
        <Typography variant="body2">Description: {course.description}</Typography>
      </Paper>
    </Grid>
  ))
) : (
  <Grid item xs={12}>
    <Typography>No courses assigned.</Typography>
  </Grid>
)}

  </Grid>
</Paper>

    </section>
  );
};

export default ProfessorCourses;
