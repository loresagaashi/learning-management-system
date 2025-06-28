import React from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';

export default function CourseMaterials({ courses, courseId, navigate }) {
  // Ensure courses is always an array
  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <Card style={{ marginTop: '16px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Other Courses
        </Typography>
        {safeCourses.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No other courses available
          </Typography>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }}>
            {safeCourses.map((course) => (
              <Card 
                key={course.id} 
                onClick={() => course.id && navigate(`/professor/lms/course/${course.id}`)}
                style={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
              >
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Typography variant="body1">
                      {course.name || 'Unnamed Course'}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
