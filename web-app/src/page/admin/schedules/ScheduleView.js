import axios from "axios";
import { useEffect, useState } from "react";

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

  const semesterId = 2;

  useEffect(() => {
    axios.get("http://localhost:8080/generations/all")
      .then((res) => setGenerations(res.data));

    axios.get("http://localhost:8080/courses/all")
      .then((res) => setCourses(res.data));

    axios.get("http://localhost:8080/professors/all")
      .then((res) => setProfessors(res.data));
  }, []);

  useEffect(() => {
    if (selectedGeneration) {
      axios
        .get(`http://localhost:8080/student-groups/by-generation?generationName=${selectedGeneration}`)
        .then((res) => setGroups(res.data));
    }
  }, [selectedGeneration]);

  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(`http://localhost:8080/schedules/groups/${selectedGroupId}/schedule`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setExistingSchedule(res.data);
            setHasExistingSchedule(true);
          } else {
            setExistingSchedule([]);
            setHasExistingSchedule(false);
          }
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

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/schedules/weekly", {
        groupId: selectedGroupId,
        semesterId: semesterId,
        scheduleEntries,
      })
      .then(() => alert("Orari u regjistrua me sukses!"))
      .catch(() => alert("Gabim gjatë regjistrimit të orarit."));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vendosja e Orarit për Grup</h1>

      <label className="block mb-2">Zgjidh Gjeneratën:</label>
      <select
        value={selectedGeneration}
        onChange={(e) => setSelectedGeneration(e.target.value)}
        className="mb-4 border px-3 py-2 rounded w-full"
      >
        <option value="">-- Zgjidh Gjeneratën --</option>
        {generations.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      {groups.length > 0 && (
        <>
          <label className="block mb-2">Zgjidh Grupin:</label>
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            className="mb-4 border px-3 py-2 rounded w-full"
          >
            <option value="">-- Zgjidh Grupin --</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </>
      )}

      {hasExistingSchedule && (
        <div className="mb-4 p-4 border border-yellow-400 bg-yellow-100 rounded">
          <p className="font-semibold text-yellow-800 mb-2">
            Ky grup tashmë ka një orar të regjistruar:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-800">
           {existingSchedule.map((entry, idx) => (
  <li key={idx}>
    {entry.dayOfWeek}, {entry.startTime} - {entry.endTime} (
    {entry.courseName}, {entry.professorName}, Salla: {entry.room})
  </li>
))}

          </ul>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-2">Orari Javës</h2>
      {scheduleEntries.map((entry, index) => (
        <div key={index} className="border p-4 mb-4 rounded grid grid-cols-6 gap-2">
          <select
            value={entry.dayOfWeek}
            onChange={(e) => handleChangeEntry(index, "dayOfWeek", e.target.value)}
            className="col-span-1 border rounded px-2 py-1"
          >
            {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <input
            type="time"
            value={entry.startTime}
            onChange={(e) => handleChangeEntry(index, "startTime", e.target.value)}
            className="col-span-1 border rounded px-2 py-1"
          />
          <input
            type="time"
            value={entry.endTime}
            onChange={(e) => handleChangeEntry(index, "endTime", e.target.value)}
            className="col-span-1 border rounded px-2 py-1"
          />

          <select
            value={entry.courseId}
            onChange={(e) => handleChangeEntry(index, "courseId", e.target.value)}
            className="col-span-1 border rounded px-2 py-1"
          >
            <option value="">-- Lënda --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <select
            value={entry.professorId}
            onChange={(e) => handleChangeEntry(index, "professorId", e.target.value)}
            className="col-span-1 border rounded px-2 py-1"
          >
            <option value="">-- Profesori --</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.firstName} {prof.lastName}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Salla"
            value={entry.room}
            onChange={(e) => handleChangeEntry(index, "room", e.target.value)}
            className="col-span-1 border rounded px-2 py-1"
          />
        </div>
      ))}

      <button
        onClick={handleAddEntry}
        className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded mb-4"
      >
        + Shto Orë tjetër
      </button>

      <br />
      <button
        onClick={handleSubmit}
        disabled={!selectedGroupId || scheduleEntries.length === 0}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Ruaj Orarin
      </button>
    </div>
  );
};

export default AdminScheduleCreate;
