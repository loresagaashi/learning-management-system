// src/page/student/LMS/components/LectureList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';

const LectureSelect = ({ course }) => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    if (course?.id) {
      axios
        .get(`/courses/${course.id}/lectures`)
        .then(res => setLectures(res.data))
        .catch(err => console.error('Failed to load lectures:', err));
    }
  }, [course]);

  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 16 }}>
      <Typography variant="h6">Lectures for {course?.name}</Typography>
      <List>
        {lectures.map(lecture => (
          <ListItem key={lecture.id}>
            <ListItemText
              primary={lecture.name}
              secondary={`Date: ${lecture.lectureDate} | Topic: ${lecture.topic}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default LectureSelect;
