import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import { GenerationService } from '../../../../service/GenerationService';

const generationService = new GenerationService();

const GenerationSelect = ({ value, onChange, degreeType }) => {
  console.log('GenerationSelect received degreeType:', degreeType);
  const {
    data: generations = [],
    isLoading,
    isError,
    error,
  } = useQuery(
    [QueryKeys.GENERATIONS, degreeType],
    () => generationService.findByDegreeType(degreeType),
    {
      enabled: !!degreeType, // only run if degreeType is truthy
      retry: 1, // retry once on failure
      onError: (err) => {
        console.error('Error fetching generations:', err);
      }
    }
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Generation ({degreeType})
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="generation-select-label">Generation</InputLabel>
        <Select
          labelId="generation-select-label"
          id="generation-select"
          value={value || ""} /* Ensure value is controlled, use empty string for no selection if value is object */
          onChange={(e) => onChange(e.target.value)}
          label="Generation"
          disabled={isLoading || isError}
        >
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Loading...
            </MenuItem>
          ) : isError ? (
            <MenuItem disabled>
              <Typography color="error">Error loading generations:</Typography>
              <Typography variant="caption" color="error">{error?.message || 'Unknown error'}</Typography>
            </MenuItem>
          ) : generations.length === 0 ? (
            <MenuItem disabled>No generations available</MenuItem>
          ) : (
            generations.map((generation) => (
              <MenuItem key={generation.id} value={generation}>
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
