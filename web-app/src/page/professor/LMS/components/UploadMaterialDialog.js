import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from "@mui/material";
import { axiosInstance } from "../../../../service/axiosInstance";

// Simple reusable dialog for uploading a single material to a lecture
export default function UploadMaterialDialog({ open, onClose, lectureId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !lectureId) {
      alert("File and Lecture ID are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("lectureId", lectureId);
    formData.append("description", description);

    try {
      const response = await axiosInstance.post("/materials/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Upload successful");
      setSelectedFile(null);
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Material</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            id="upload-file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <Button variant="outlined" component="span">
              {selectedFile ? selectedFile.name : "Choose File"}
            </Button>
          </label>

          <Button
            variant="contained"
            color="primary"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
