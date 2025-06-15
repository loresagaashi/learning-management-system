import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  styled
} from '@mui/material';
import { QueryKeys } from '../../../../service/QueryKeys';
import { OrientationService } from '../../../../service/OrientationService';
import { useQuery } from 'react-query';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  '&.Mui-selected': {
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  '& > *': {
    margin: 0,
  },
}));

const orientationService = new OrientationService();

const LectureSelect = ({ value, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(value);

  const { data: allOrientations = [], isLoading, isError } = useQuery(QueryKeys.ORIENTATION, 
    () => orientationService.findAll()
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading orientations.</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Category
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          mt: 2,
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        {allOrientations.map((orientation) => (
          <StyledCard
            key={orientation.id}
            className={selectedCategory === orientation.name ? 'Mui-selected' : ''}
            onClick={() => {
              setSelectedCategory(orientation.name);
              onChange(orientation.name);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image = 'https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg'
              alt={orientation.name}
              sx={{
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <StyledCardContent>
              <Typography variant="h6" component="div">
                {orientation.name}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        ))}
      </Box>
    </Box>
  );
};

export default LectureSelect;
