import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function StudentList({ students, lectures }) {
  return (
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
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
