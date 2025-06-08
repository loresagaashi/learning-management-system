import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../../../../service/CourseService';

const courseService = new CourseService();

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  boxShadow: theme.shadows[3],
}));

const CourseCard = ({ course, isSelected }) => {
  const navigate = useNavigate();
  const { id, name, description } = course;

  const handleCardClick = () => {
    navigate(`/student/lms/course/${id}`);
  };

  const [professors, setProfessors] = React.useState([]);
  console.log('Initial professors state:', professors);

  React.useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await courseService.getProfessorsByCourse(id);
        console.log('Fetched professors:', response);
        setProfessors(response || []);
      } catch (error) {
        console.error('Error fetching professors:', error);
        setProfessors(['No professors found']);
      }
    };
    fetchProfessors();
  }, [id]);

  console.log('Rendering with professors:', professors);

  return (
    <StyledCard onClick={handleCardClick}>
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
        <Typography variant="body2" color="text.secondary">
          {professors && professors.length > 0 ? professors.join(', ') : 'No professors'}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default CourseCard;
