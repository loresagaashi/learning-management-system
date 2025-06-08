import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const AdminViewSchedule = () => {
  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/generations/all")
      .then((res) => setGenerations(res.data))
      .catch((err) => console.error("Error loading generations", err));
  }, []);

  useEffect(() => {
    if (selectedGeneration) {
      axios
        .get(
          `http://localhost:8080/student-groups/by-generation?generationName=${selectedGeneration}`
        )
        .then((res) => setGroups(res.data))
        .catch((err) => console.error("Error loading groups", err));
    }
  }, [selectedGeneration]);

  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(
          `http://localhost:8080/schedules/groups/${selectedGroupId}/schedule`
        )
        .then((res) => setSchedule(res.data))
        .catch((err) => console.error("Error loading schedule", err));
    }
  }, [selectedGroupId]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        View Group Schedule
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Generation</InputLabel>
        <Select
          value={selectedGeneration}
          label="Select Generation"
          onChange={(e) => {
            setSelectedGeneration(e.target.value);
            setSelectedGroupId("");
            setSchedule([]);
          }}
        >
          <MenuItem value="">
            <em>-- Select Generation --</em>
          </MenuItem>
          {generations.map((g) => (
            <MenuItem key={g.id} value={g.name}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {groups.length > 0 && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Group</InputLabel>
          <Select
            value={selectedGroupId}
            label="Select Group"
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <MenuItem value="">
              <em>-- Select Group --</em>
            </MenuItem>
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {schedule.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Group Schedule
          </Typography>
          <Paper elevation={3}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Professor</TableCell>
                  <TableCell>Room</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.dayOfWeek}</TableCell>
                    <TableCell>{entry.startTime}</TableCell>
                    <TableCell>{entry.endTime}</TableCell>
                    <TableCell>{entry.courseName}</TableCell>
                    <TableCell>{entry.professorName}</TableCell>
                    <TableCell>{entry.room}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}

      {selectedGroupId && schedule.length === 0 && (
        <Typography mt={4} color="text.secondary">
          This group does not have a registered schedule yet.
        </Typography>
      )}
    </Box>
  );
};

export default AdminViewSchedule;
