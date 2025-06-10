import React from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function LectureSubmissions() {
  // Static submissions data
  const submissions = [
    {
      student: {
        firstName: 'John',
        lastName: 'Doe'
      },
      submissionDate: '2025-06-10',
      fileName: 'homework.pdf'
    },
    {
      student: {
        firstName: 'Jane',
        lastName: 'Smith'
      },
      submissionDate: '2025-06-10',
      fileName: 'assignment.docx'
    },
    {
      student: {
        firstName: 'Bob',
        lastName: 'Johnson'
      },
      submissionDate: '2025-06-10',
      fileName: 'project.zip'
    }
  ];

  return (
    <Box style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Student Submissions
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>File</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={index}>
                <TableCell>
                  {submission.student.firstName} {submission.student.lastName}
                </TableCell>
                <TableCell>
                  {submission.submissionDate}
                </TableCell>
                <TableCell>
                  {submission.fileName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
