import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { GenerationService } from '../../../../service/GenerationService';

const generationService = new GenerationService();

const GenerationSelect = ({ value, onChange }) => {
  const { data: generations = [], isLoading, isError } = useQuery(
    QueryKeys.GENERATIONS,
    () => generationService.findAll()
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Generation
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="generation-select-label">Generation</InputLabel>
        <Select
          labelId="generation-select-label"
          id="generation-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Generation"
          disabled={isLoading || isError}
        >
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
              Loading...
            </MenuItem>
          ) : isError ? (
            <MenuItem disabled>Error loading generations</MenuItem>
          ) : (
            generations.map((generation) => (
              <MenuItem key={generation.id} value={generation.name}>
                {generation.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      {isError && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          Failed to load generations. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default GenerationSelect;
