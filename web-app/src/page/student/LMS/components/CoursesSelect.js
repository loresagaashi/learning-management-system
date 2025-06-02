import React, { useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Grid
} from '@mui/material';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { CourseService } from '../../../../service/CourseService';
import CourseCard from './CourseCard';

const courseService = new CourseService();

const CoursesSelect = ({ value, onChange }) => {
  const { isLoading, isError, data: courses } = useQuery(
    QueryKeys.COURSES,
    () => courseService.findAll()
  );

  const handleCourseClick = (courseId) => {
    const selectedCourses = value.includes(courseId)
      ? value.filter(id => id !== courseId)
      : [...value, courseId];
    onChange(selectedCourses);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Courses
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" variant="body2" sx={{ mt: 4 }}>
          Failed to load courses. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                isSelected={value.includes(course.id)}
                onClick={handleCourseClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CoursesSelect;
