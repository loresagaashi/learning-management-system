import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { SemesterService } from "../../../service/SemesterService";
import { useQuery } from "react-query";
import { QueryKeys } from "../../../service/QueryKeys";
import { StudentSemesterService } from "../../../service/StudentSemesterService";
import useUser from "../../../hooks/useUser";

const semesterService = new SemesterService();
const studentSemesterService = new StudentSemesterService();

const SemesterRegistration = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [registeredSemesters, setRegisteredSemesters] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const studentId = user?.user?.id; 

  const { data: allSemesters } = useQuery(QueryKeys.SEMESTER, () =>
    semesterService.findAll()
  );
  useEffect(() => {
    if (!user || !user.user?.id) {
    console.error("No professor ID found in user:", user);
    return;
  }
  studentSemesterService
  .getSemestersByStudentId(user.user.id)
  .then((semesters) => {
    console.log("Response from getSemestersByStudentId:", semesters);
    setSemesters(semesters || []);
    setLoading(false);
  })
  .catch((error) => {
      console.error("Error fetching courses:", error);
      setLoading(false);
    });
  }, [user]);


  const handleRegister = async () => {
    if (!selectedSemester) {
      setError("Please select a semester.");
      return;
    }

    if (!studentId) {
      setError("User not logged in or student ID missing.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const res = await studentSemesterService.register(
        studentId,
        selectedSemester
      );
      setMessage(res.data);

      const semestersRes =
        await studentSemesterService.getSemestersByStudentId(studentId);
      setRegisteredSemesters(semestersRes.data);
    } catch (err) {
      console.error("Registration error:", err);
      const status = err?.response?.status;
      const errorMessage = err?.response?.data || "Registration failed.";

      if (status === 409) {
        setError("You are already registered in this semester.");
      } else if (status === 401 || status === 403) {
        setError("Authentication error. Please log in again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register in a Semester
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="semester-label">Select Semester</InputLabel>
        <Select
          labelId="semester-label"
          value={selectedSemester}
          label="Select Semester"
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {(allSemesters || []).length > 0 ? (
            allSemesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name} ({semester.season})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No semesters available</MenuItem>
          )}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        disabled={submitting}
      >
        {submitting ? "Registering..." : "Register"}
      </Button>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Registered Semesters
        </Typography>

        {(registeredSemesters || []).length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            You haven't registered in any semester yet.
          </Typography>
        ) : (
          <List>
            {registeredSemesters.map((sem) => (
              <ListItem key={sem.id}>
                <ListItemText primary={`${sem.name} (${sem.season})`} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default SemesterRegistration;
