import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  IconButton
} from '@mui/material';

export default function LectureList({ 
  lectures, 
  onAddLecture, 
  onEditLecture, 
  onAddMaterial,
  uploadLectureId,
  setUploadLectureId,
  setUploadDialogOpen
}) {
  // Ensure lectures is always an array
  const safeLectures = Array.isArray(lectures) ? lectures : [];

  return (
    <Card>
      <CardContent>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="h6" gutterBottom>
            Lectures
          </Typography>
          <Button
            variant="contained"
            onClick={onAddLecture}
          >
            Add Lecture
          </Button>
        </Box>
        <Box>
          {safeLectures.map((lecture) => (
            <Card key={lecture.id} style={{ marginBottom: '8px' }}>
              <CardContent>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Typography variant="h6">
                    {lecture.name}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => onEditLecture(lecture)}>
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {lecture.description || 'Click to add lecture'}
                </Typography>
                <Box style={{ marginTop: '16px' }}>
                  <Typography variant="subtitle1">Materials:</Typography>
                  {lecture.materials?.map((material, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      <a href={material.url} target="_blank" rel="noopener noreferrer">
                        {material.name}
                      </a>
                    </Typography>
                  ))}
                </Box>
                <Box style={{ marginTop: '8px' }}>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    onClick={() => { 
                      setUploadLectureId(lecture.id); 
                      setUploadDialogOpen(true); 
                    }}
                  >
                    Add Material
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
