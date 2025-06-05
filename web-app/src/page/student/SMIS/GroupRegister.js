import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, Alert, Snackbar, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { getCurrentUser } from "../../../service/ServiceMe";

const GroupRegister = () => {
  const { user } = useUser();
  const studentId = user?.user?.studentId;
  const userId = user?.user?.id;

  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [availableSpots, setAvailableSpots] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [semesterId, setSemesterId] = useState(null);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Merr semesterId nga getCurrentUser
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setSemesterId(currentUser?.data.semesterId);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };
    fetchUserData();
  }, []);

  // Gjeneron generationName nga studentId
  const generationNameFromStudentId = (id) => {
    const idStr = String(id);
    if (!idStr || idStr.length < 4) return null;
    return `${idStr.substring(0, 2)}/${idStr.substring(2, 4)}`;
  };

  const generationName = generationNameFromStudentId(studentId);

  // Merr grupet kur kemi generationName dhe semesterId
  useEffect(() => {
    if (generationName && semesterId) {
      axios
        .get(
          `http://localhost:8080/student-groups/by-generation-and-semester?generationName=${generationName}&semesterId=${semesterId}`
        )
        .then((res) => setGroups(res.data))
        .catch((err) =>
          console.error("Error fetching groups", err)
        );
    }
  }, [generationName, semesterId]);

  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(
          `http://localhost:8080/student-groups/group/${selectedGroupId}/available-spots`
        )
        .then((res) => setAvailableSpots(res.data))
        .catch((err) =>
          console.error("Error fetching available spots", err)
        );

      axios
        .get(
          `http://localhost:8080/schedules/groups/${selectedGroupId}/schedule`
        )
        .then((res) => setSchedule(res.data))
        .catch((err) =>
          console.error("Error fetching schedule", err)
        );
    } else {
      setAvailableSpots(null);
      setSchedule([]);
    }
  }, [selectedGroupId]);

  const handleAssignGroup = async () => {
    if (!studentId || !selectedGroupId) return;

    setLoading(true);
    try {
      const checkRes = await axios.get(
        `http://localhost:8080/students/${userId}/group/${selectedGroupId}/check`
      );

      if (checkRes.data === true) {
        setAlert({
          message: "You are already registered in this group.",
          severity: "info",
        });
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:8080/students/assign-to-group", {
        studentId: userId,
        groupId: selectedGroupId,
      });

      setAlert({
        message: "Successfully registered to the group!",
        severity: "success",
      });
    } catch (err) {
      console.error("Registration error", err);
      setAlert({
        message: "An error occurred during registration.",
        severity: "error",
      });
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Register to a Group
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Group</InputLabel>
        <Select
          value={selectedGroupId}
          label="Select Group"
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          <MenuItem value="">
            <em>-- Choose a group --</em>
          </MenuItem>
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {availableSpots !== null && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Available spots: <strong>{availableSpots}</strong>
        </Alert>
      )}

      {schedule.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Group Schedule:
          </Typography>
          <List dense>
            {schedule.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`${item.dayOfWeek}: ${item.startTime} - ${item.endTime}`}
                  secondary={item.subjectName}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Button
        onClick={handleAssignGroup}
        variant="contained"
        color="primary"
        fullWidth
        disabled={!selectedGroupId || loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        Register to Group
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GroupRegister;
