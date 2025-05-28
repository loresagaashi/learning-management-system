import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  styled
} from '@mui/material';

// Category data with images and descriptions
const categoryData = {
  "Shkenca Kompjuterike dhe Inxhinieri": {
    image: 'https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg'
  },
  "Menaxhment, Biznes dhe Ekonomi": {
    image: 'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  "Juridik": {
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  "Inxhinieri Ndertimore": {
    image: 'https://images.pexels.com/photos/32277924/pexels-photo-32277924/free-photo-of-workers-climbing-high-steel-scaffolding-structure.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  "Sisteme te Informacionit": {
    image: 'https://images.pexels.com/photos/9951077/pexels-photo-9951077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  "Mekatronike": {
    image: 'https://images.pexels.com/photos/8294620/pexels-photo-8294620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
};

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

const LectureSelect = ({ value, onChange, options }) => {
  const [selectedCategory, setSelectedCategory] = useState(value);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Category
      </Typography>
      <Box sx={{
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
      }}>
        {options.map((option) => (
          <StyledCard
            key={option}
            className={selectedCategory === option ? 'Mui-selected' : ''}
            onClick={() => {
              setSelectedCategory(option);
              onChange(option);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={categoryData[option]?.image || '/default-category-image.jpg'}
              alt={option}
              sx={{
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <StyledCardContent>
              <Typography variant="h6" component="div">
                {option}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        ))}
      </Box>
    </Box>
  );
};

export default LectureSelect;
