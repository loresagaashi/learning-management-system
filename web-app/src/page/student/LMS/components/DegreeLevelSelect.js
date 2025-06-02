import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  styled
} from '@mui/material';
import axios from 'axios';

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  margin: theme.spacing(1),
  textTransform: 'none',
}));

const DegreeLevelSelect = ({ value, onChange }) => {
  const [selectedLevel, setSelectedLevel] = useState(value);
  const [degreeTypes, setDegreeTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/degree-types')
      .then(response => setDegreeTypes(response.data))
      .catch(error => console.error("Failed to fetch degree types", error));
  }, []);

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
        {degreeTypes.map((type) => (
          <StyledButton
            key={type}
            variant={selectedLevel === type ? 'contained' : 'outlined'}
            onClick={() => handleSelect(type)}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()} {/* Format nicely */}
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
};

export default DegreeLevelSelect;
