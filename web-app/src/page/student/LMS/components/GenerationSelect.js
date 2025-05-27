import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';

const GenerationSelect = ({ selectedGeneration, setSelectedGeneration }) => {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    axios
      .get('/generations')
      .then(res => setGenerations(res.data))
      .catch(err => console.error('Failed to fetch generations', err));
  }, []);

  const handleChange = (event) => {
    const selected = generations.find(g => g.id === event.target.value);
    setSelectedGeneration(selected);
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">Select Generation</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="generation-select-label">Generation</InputLabel>
        <Select
          labelId="generation-select-label"
          value={selectedGeneration?.id || ''}
          onChange={handleChange}
        >
          {generations.map(generation => (
            <MenuItem key={generation.id} value={generation.id}>
              {generation.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GenerationSelect;
