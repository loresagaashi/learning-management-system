import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  styled
} from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  margin: theme.spacing(1),
  textTransform: 'none',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const DegreeLevelSelect = ({ value, onChange }) => {
  const [selectedLevel, setSelectedLevel] = useState(value);

  const handleSelect = (level) => {
    setSelectedLevel(level);
    onChange(level);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Degree Level
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <StyledButton
          variant={selectedLevel === 'BACHELOR' ? 'contained' : 'outlined'}
          onClick={() => handleSelect('BACHELOR')}
        >
          Bachelor
        </StyledButton>
        <StyledButton
          variant={selectedLevel === 'MASTER' ? 'contained' : 'outlined'}
          onClick={() => handleSelect('MASTER')}
        >
          Master
        </StyledButton>
      </Box>
    </Box>
  );
};

export default DegreeLevelSelect;