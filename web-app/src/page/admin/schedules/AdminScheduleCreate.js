import { Box, Button, Grid, MenuItem, Select, TextField, Typography, Alert, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminScheduleCreate = () => {
  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [scheduleEntries, setScheduleEntries] = useState([
    {
      dayOfWeek: "MONDAY",
      startTime: "",
      endTime: "",
      courseId: "",
      professorId: "",
      room: "",
    },
  ]);
  const [existingSchedule, setExistingSchedule] = useState([]);
  const [hasExistingSchedule, setHasExistingSchedule] = useState(false);
  const [groupError, setGroupError] = useState(false);
  const navigate = useNavigate();

  const semesterId = 2;

  useEffect(() => {
    axios.get("http://localhost:8080/generations/all")
      .then((res) => setGenerations(Array.isArray(res.data) ? res.data : []))
      .catch(() => setGenerations([]));
      
    axios.get("http://localhost:8080/courses/all")
      .then((res) => {
        console.log('AdminScheduleCreate - courses response:', res.data);
        console.log('AdminScheduleCreate - courses type:', typeof res.data);
        console.log('AdminScheduleCreate - courses isArray:', Array.isArray(res.data));
        
        // Handle the same JSON parsing issue as CustomMaterialTable
        let coursesData = res.data;
        if (typeof res.data === 'string') {
          try {
            coursesData = JSON.parse(res.data);
          } catch (parseError) {
            console.error('AdminScheduleCreate - failed to parse courses JSON:', parseError);
            // Try regex extraction like in CustomMaterialTable
            try {
              const coursePattern = /"id":(\d+),"name":"([^"]+)","description":"([^"]+)"/g;
              const courses = [];
              let match;
              
              while ((match = coursePattern.exec(res.data)) !== null) {
                const course = {
                  id: parseInt(match[1]),
                  name: match[2],
                  description: match[3],
                  createdOn: new Date().toISOString(),
                  updatedOn: new Date().toISOString(),
                  professor: [],
                  orientation: { name: '' },
                  semester: { name: '' }
                };
                courses.push(course);
              }
              
              if (courses.length > 0) {
                console.log('AdminScheduleCreate - successfully extracted courses via regex:', courses.length);
                coursesData = courses;
              } else {
                coursesData = [];
              }
            } catch (fallbackError) {
              console.error('AdminScheduleCreate - regex extraction also failed:', fallbackError);
              coursesData = [];
            }
          }
        }
        
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      })
      .catch(() => setCourses([]));
      
    axios.get("http://localhost:8080/professors/all")
      .then((res) => setProfessors(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProfessors([]));
  }, []);

  useEffect(() => {
    if (selectedGeneration) {
      axios
        .get(`http://localhost:8080/student-groups/by-generation?generationName=${selectedGeneration}`)
        .then((res) => {
          setGroups(res.data);
          setGroupError(res.data.length === 0);
          console.log("GROUPS DATA:", res.data);
        })
        .catch(() => {
          setGroups([]);
          setGroupError(true);
        });
    } else {
      setGroups([]);
      setGroupError(false);
    }
  }, [selectedGeneration]);

  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(`http://localhost:8080/schedules/groups/${selectedGroupId}/schedule`)
        .then((res) => {
          const data = res.data || [];
          setExistingSchedule(data);
          setHasExistingSchedule(data.length > 0);
        })
        .catch(() => {
          setExistingSchedule([]);
          setHasExistingSchedule(false);
        });
    }
  }, [selectedGroupId]);

  const handleAddEntry = () => {
    setScheduleEntries([
      ...scheduleEntries,
      {
        dayOfWeek: "MONDAY",
        startTime: "",
        endTime: "",
        courseId: "",
        professorId: "",
        room: "",
      },
    ]);
  };

  const handleChangeEntry = (index, field, value) => {
    const updatedEntries = [...scheduleEntries];
    updatedEntries[index][field] = value;
    setScheduleEntries(updatedEntries);
  };
  const handleRemoveEntry = (indexToRemove) => {
    const updatedEntries = scheduleEntries.filter((_, index) => index !== indexToRemove);
    setScheduleEntries(updatedEntries);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/schedules/weekly", {
        groupId: selectedGroupId,
        semesterId: semesterId,
        scheduleEntries,
      })
      .then(() => {
        alert("Schedule registered successfully!");
        navigate("/admin/view-schedule");
      })
      .catch(() => alert("Error while registering schedule."));
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weekly Schedule
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Generation</InputLabel>
        <Select
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(e.target.value)}
          label="Select Generation"
        >
          <MenuItem value="">Select Generation</MenuItem>
          {Array.isArray(generations) && generations.map((g) => (
            <MenuItem key={g.id} value={g.name}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {groupError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          No groups found for the selected generation.
        </Alert>
      )}

      {groups.length > 0 && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Group</InputLabel>
          <Select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            label="Select Group"
          >
            <MenuItem value="">Select Group</MenuItem>
            {Array.isArray(groups) && groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {hasExistingSchedule && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography fontWeight="bold" gutterBottom>
            This group already has a registered schedule:
          </Typography>
          <ul>
            {Array.isArray(existingSchedule) && existingSchedule.map((entry, idx) => (
              <li key={idx}>
                {entry.dayOfWeek}, {entry.startTime} - {entry.endTime} (
                {entry.courseName}, {entry.professorName}, Room: {entry.room})
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <Typography variant="h6" sx={{ mt: 4 }}>
        Weekly Schedule Entries
      </Typography>

      {scheduleEntries.map((entry, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <Select
                value={entry.dayOfWeek}
                onChange={(e) => handleChangeEntry(index, "dayOfWeek", e.target.value)}
              >
                {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              type="time"
              label="Start Time"
              value={entry.startTime}
              onChange={(e) => handleChangeEntry(index, "startTime", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              type="time"
              label="End Time"
              value={entry.endTime}
              onChange={(e) => handleChangeEntry(index, "endTime", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <Select
                value={entry.courseId}
                onChange={(e) => handleChangeEntry(index, "courseId", e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Course</MenuItem>
                {Array.isArray(courses) && courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <Select
                value={entry.professorId}
                onChange={(e) => handleChangeEntry(index, "professorId", e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Professor</MenuItem>
                {Array.isArray(professors) && professors.map((prof) => (
                  <MenuItem key={prof.id} value={prof.id}>
                    {prof.firstName} {prof.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Room"
              value={entry.room}
              onChange={(e) => handleChangeEntry(index, "room", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveEntry(index)}
              disabled={scheduleEntries.length === 1}
              fullWidth
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Button variant="outlined" onClick={handleAddEntry}>
          + Add Another
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedGroupId || scheduleEntries.length === 0}
        >
          Save Schedule
        </Button>
      </Box>

    </Box>
  );
};

export default AdminScheduleCreate;
