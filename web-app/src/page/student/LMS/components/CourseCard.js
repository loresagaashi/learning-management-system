import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  boxShadow: theme.shadows[3],
}));

const CourseCard = ({ course, isSelected, onClick }) => {
  const { id, name, description, imageUrl } = course;

  return (
    <StyledCard onClick={() => onClick(id)} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl || '/default-course-image.jpg'}
        alt={name}
        sx={{
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          {isSelected && (
            <Box
              sx={{
                p: 0.5,
                bgcolor: 'primary.main',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✓
            </Box>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default CourseCard;
