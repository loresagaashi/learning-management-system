import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const CoursesSelect = ({ semester }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (semester?.id) {
      axios
        .get(`/api/semester/${semester.id}/courses`) 
        .then(res => setCourses(res.data))
        .catch(err => console.error('Error fetching courses:', err));
    }
  }, [semester]);

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h6">Courses for {semester?.name}</Typography>
      <List>
        {courses.map(course => (
          <ListItem key={course.id}>
            <ListItemText primary={course.name} secondary={course.description} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CoursesSelect;
