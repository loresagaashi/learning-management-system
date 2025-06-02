import axios from "axios";
import { useEffect, useState } from "react";

const AdminViewSchedule = () => {
  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [schedule, setSchedule] = useState([]);
  const semesterId = 1;

  useEffect(() => {
    axios.get("http://localhost:8080/generations/all")
      .then(res => setGenerations(res.data))
      .catch(err => console.error("Error loading generations", err));
  }, []);

  useEffect(() => {
    if (selectedGeneration) {
      axios
        .get(`http://localhost:8080/student-groups/by-generation?generationName=${selectedGeneration}`)
        .then(res => setGroups(res.data))
        .catch(err => console.error("Error loading groups", err));
    }
  }, [selectedGeneration]);

  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(`http://localhost:8080/schedules/groups/${selectedGroupId}/schedule`)
        .then(res => setSchedule(res.data))
        .catch(err => console.error("Error loading schedule", err));
    }
  }, [selectedGroupId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shikimi i Orarit për Grup</h1>

      <label className="block mb-2">Zgjidh Gjeneratën:</label>
      <select
        value={selectedGeneration}
        onChange={(e) => {
          setSelectedGeneration(e.target.value);
          setSelectedGroupId("");
          setSchedule([]);
        }}
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

      {schedule.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Orari i Grupit</h2>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Dita</th>
                <th className="p-2 border">Ora Fillimit</th>
                <th className="p-2 border">Ora Mbarimit</th>
                <th className="p-2 border">Lënda</th>
                <th className="p-2 border">Profesori</th>
                <th className="p-2 border">Salla</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry, index) => (
                <tr key={index}>
                  <td className="p-2 border">{entry.dayOfWeek}</td>
                  <td className="p-2 border">{entry.startTime}</td>
                  <td className="p-2 border">{entry.endTime}</td>
                  <td className="p-2 border">{entry.courseName}</td>
                  <td className="p-2 border">{entry.professorName}</td>
                  <td className="p-2 border">{entry.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedGroupId && schedule.length === 0 && (
        <p className="text-gray-500 mt-4">Ky grup nuk ka ende orar të regjistruar.</p>
      )}
    </div>
  );
};

export default AdminViewSchedule;
