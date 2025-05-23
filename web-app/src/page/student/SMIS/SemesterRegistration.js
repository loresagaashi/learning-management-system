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

  const { user } = useUser();
  const studentId = user?.user?.id; // or user?.user?.studentId

  const { data: allSemesters } = useQuery(QueryKeys.SEMESTER, () =>
    semesterService.findAll()
  );
  useEffect(() => {
    if (user && user.user?.id) {
      studentSemesterService
        .findByStudentId(user?.user?.id)
        .then((res) => {
          setRegisteredSemesters(res);
          console.log("Fetched registered semesters:", res);
        })
        .catch(() => {
          setError("Failed to load registered semesters.");
        });
    }
  }, [user]);

  // const uniqueSemestersMap = new Map();
  // registeredSemesters.forEach((reg) => {
  //   if (!uniqueSemestersMap.has(reg.semester.id)) {
  //     uniqueSemestersMap.set(reg.semester.id, reg);
  //   }
  // });
  // const uniqueRegisteredSemesters = Array.from(uniqueSemestersMap.values());

  const handleRegister = () => {
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

    studentSemesterService
      .register(studentId, selectedSemester)
      .then(() => {
        setMessage("Successfully registered in the semester.");
        // 🔁 Re-fetch registered semesters
        return studentSemesterService.findByStudentId(studentId);
      })
      .then((res) => {
        console.log("Full response:", res);
        setRegisteredSemesters(res || []);
      })

      .catch((err) => {
        setError(err.response?.data || "Registration failed.");
      })
      .finally(() => setSubmitting(false));
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
          {Array.isArray(allSemesters) && allSemesters.length > 0 ? (
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

      {/* Show registered semesters below */}
      {/* Show registered semesters below */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Registered Semesters
        </Typography>
        {Array.isArray(registeredSemesters) ? (
          registeredSemesters.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              You haven't registered in any semester yet.
            </Typography>
          ) : (
            <List>
              {registeredSemesters.map((registration) => (
                <ListItem key={registration.id}>
                  <ListItemText
                    primary={
                      registration.semester
                        ? `${registration.semester.name} (${registration.semester.season})`
                        : "No semester data"
                    }
                    secondary={
                      registration.registrationDate
                        ? `Registered on: ${new Date(registration.registrationDate).toLocaleDateString()}`
                        : "No date"
                    }
                  />
                </ListItem>
              ))}
            </List>
          )
        ) : (
          <Typography variant="body2" color="text.secondary">
            Loading or no data available.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SemesterRegistration;
