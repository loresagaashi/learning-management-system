import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function CourseInfoCard({ course, professors }) {
  return (
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
  );
}
