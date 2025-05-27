import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SemesterSelect = ({ selected, onSelect, generation }) => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    if (generation?.id) {
      axios
        .get(`/api/semester/semesters`) 
        .then(res => {
          const filtered = res.data.filter(s => s.generation.id === generation.id);
          setSemesters(filtered);
        })
        .catch(err => console.error('Error loading semesters:', err));
    }
  }, [generation]);

  return (
    <FormControl fullWidth>
      <InputLabel>Select Semester</InputLabel>
      <Select
        value={selected ? selected.id : ''}
        onChange={(e) => {
          const semester = semesters.find(s => s.id === e.target.value);
          onSelect(semester);
        }}
      >
        {semesters.map(sem => (
          <MenuItem key={sem.id} value={sem.id}>
            {sem.name} - {sem.season}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SemesterSelect;
