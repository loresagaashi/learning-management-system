import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Chip
} from '@material-ui/core';
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@material-ui/icons';

const FileUploadComponent = ({ 
  onFilesChange, 
  files = [], 
  title = "Files",
  buttonText = "Upload Files"
}) => {
  const [selectedFiles, setSelectedFiles] = useState(files);

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      file: file,
      description: '',
      id: Date.now() + Math.random() // Simple unique ID
    }));
    
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDescriptionChange = (id, description) => {
    const updatedFiles = selectedFiles.map(fileItem => 
      fileItem.id === id ? { ...fileItem, description } : fileItem
    );
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleRemoveFile = (id) => {
    const updatedFiles = selectedFiles.filter(fileItem => fileItem.id !== id);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      <input
        type="file"
        multiple
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      
      <label htmlFor="file-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          style={{ marginBottom: '16px' }}
        >
          {buttonText}
        </Button>
      </label>

      {selectedFiles.length > 0 && (
        <Paper elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Files ({selectedFiles.length})
          </Typography>
          
          <List>
            {selectedFiles.map((fileItem) => (
              <ListItem key={fileItem.id} divider>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Typography variant="body1">
                        {fileItem.file.name}
                      </Typography>
                      <Chip 
                        label={formatFileSize(fileItem.file.size)} 
                        size="small" 
                        variant="outlined" 
                      />
                    </div>
                  }
                  secondary={
                    <TextField
                      fullWidth
                      size="small"
                      label="Description (optional)"
                      value={fileItem.description}
                      onChange={(e) => handleDescriptionChange(fileItem.id, e.target.value)}
                      style={{ marginTop: '8px' }}
                    />
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(fileItem.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default FileUploadComponent; 