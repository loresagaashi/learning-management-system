import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Chip
} from '@material-ui/core';
import {
  Description as FileIcon,
  GetApp as DownloadIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

const MaterialsList = ({ materials = [], onDeleteMaterial, showDelete = false }) => {
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'xls':
      case 'xlsx':
        return '📈';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎥';
      case 'mp3':
      case 'wav':
        return '🎵';
      default:
        return '📎';
    }
  };

  const getFileName = (fileUrl) => {
    if (!fileUrl) return 'Unknown file';
    const parts = fileUrl.split('/');
    const fileName = parts[parts.length - 1];
    // Remove UUID prefix if present
    return fileName.includes('_') ? fileName.split('_').slice(1).join('_') : fileName;
  };

  const handleDownload = (material) => {
    const link = document.createElement('a');
    link.href = material.fileUrl;
    link.download = getFileName(material.fileUrl);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (materials.length === 0) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Materials
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No materials uploaded yet.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Materials ({materials.length})
      </Typography>
      <Paper elevation={1}>
        <List>
          {materials.map((material) => (
            <ListItem key={material.id} divider>
              <ListItemIcon>
                <Typography variant="h6">
                  {getFileIcon(getFileName(material.fileUrl))}
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Typography variant="body1">
                      {getFileName(material.fileUrl)}
                    </Typography>
                    <Chip 
                      label="Download" 
                      size="small" 
                      variant="outlined"
                      onClick={() => handleDownload(material)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                }
                secondary={
                  <div>
                    {material.description && (
                      <Typography variant="body2" color="textSecondary">
                        {material.description}
                      </Typography>
                    )}
                    <Typography variant="caption" color="textSecondary">
                      Uploaded: {new Date(material.createdOn || Date.now()).toLocaleDateString()}
                    </Typography>
                  </div>
                }
              />
              <div>
                <IconButton
                  size="small"
                  onClick={() => handleDownload(material)}
                  title="Download"
                >
                  <DownloadIcon />
                </IconButton>
                {showDelete && onDeleteMaterial && (
                  <IconButton
                    size="small"
                    onClick={() => onDeleteMaterial(material.id)}
                    title="Delete"
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default MaterialsList; 