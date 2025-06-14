import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box
} from '@mui/material';

export default function LectureDialog({ 
  open, 
  onClose, 
  onSave, 
  lectureName, 
  setLectureName, 
  lectureDescription, 
  setLectureDescription, 
  lectureMaterials, 
  setLectureMaterials,
  selectedFile,
  setSelectedFile,
  handleFileSelect,
  handleUploadMaterial,
  selectedLecture
}) {
  const handleMaterialChange = (index, field, value) => {
    const materials = [...lectureMaterials];
    materials[index][field] = value;
    setLectureMaterials(materials);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedLecture ? 'Edit Lecture' : 'Add New Lecture'}
      </DialogTitle>
      <DialogContent>
        <Box style={{ marginTop: '16px' }}>
          <TextField
            fullWidth
            label="Lecture Name"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={lectureDescription}
            onChange={(e) => setLectureDescription(e.target.value)}
            margin="normal"
          />

          <Box style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {lectureMaterials.map((material, index) => (
              <Box key={index} style={{ width: '100%', marginBottom: '8px' }}>
                <TextField
                  fullWidth
                  label="Material Name"
                  value={material.name}
                  onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Material URL"
                  value={material.url}
                  onChange={(e) => handleMaterialChange(index, 'url', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </Box>
            ))}

            <input
              type="file"
              id="material-upload"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <label htmlFor="material-upload">
              <Button
                variant="outlined"
                component="span"
                style={{ marginTop: '8px' }}
              >
                {selectedFile ? selectedFile.name : 'Upload Material'}
              </Button>
            </label>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadMaterial}
              disabled={!selectedFile}
              style={{ marginTop: '8px' }}
            >
              Upload
            </Button>

            <Button
              variant="outlined"
              onClick={() => setLectureMaterials([...lectureMaterials, { name: '', url: '' }])}
              style={{ marginTop: '8px' }}
            >
              Add Empty Material
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
