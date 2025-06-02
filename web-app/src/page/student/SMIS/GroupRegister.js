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

  // Merr semesterId nga getCurrentUser
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setSemesterId(currentUser?.data.semesterId);
      } catch (err) {
        console.error("Gabim gjatë marrjes së përdoruesit", err);
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
        .catch((err) => console.error("Gabim gjatë marrjes së grupeve", err));
    }
  }, [generationName, semesterId]);

  // Merr vendet dhe orarin kur zgjidhet grupi
  useEffect(() => {
    if (selectedGroupId) {
      axios
        .get(
          `http://localhost:8080/student-groups/group/${selectedGroupId}/available-spots`
        )
        .then((res) => setAvailableSpots(res.data))
        .catch((err) => console.error("Gabim gjatë marrjes së vendeve", err));

      axios
        .get(
          `http://localhost:8080/schedules/groups/${selectedGroupId}/schedule`
        )
        .then((res) => setSchedule(res.data))
        .catch((err) => console.error("Gabim gjatë marrjes së orarit", err));
    } else {
      setAvailableSpots(null);
      setSchedule([]);
    }
  }, [selectedGroupId]);

  // Kontrollon në backend nëse studenti është tashmë i regjistruar në grup
  const handleAssignGroup = async () => {
    if (!studentId || !selectedGroupId) return;

    try {
      const checkRes = await axios.get(
        `http://localhost:8080/students/${userId}/group/${selectedGroupId}/check`
      );

      if (checkRes.data === true) {
        alert("Tashmë je i regjistruar në këtë grup.");
        return;
      }

      await axios.post("http://localhost:8080/students/assign-to-group", {
        studentId: userId,
        groupId: selectedGroupId,
      });

      alert("U regjistrua me sukses!");
    } catch (err) {
      console.error("Gabim gjatë regjistrimit", err);
      alert("Gabim gjatë regjistrimit.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Zgjedhja e Grupit</h1>

      <label className="block mb-2 font-medium">Zgjidh grupin:</label>
      <select
        value={selectedGroupId}
        onChange={(e) => setSelectedGroupId(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      >
        <option value="">-- Zgjidh një grup --</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

      {availableSpots !== null && (
        <p className="mb-4">
          Vendet e lira: <strong>{availableSpots}</strong>
        </p>
      )}

      {schedule.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Orari i grupit:</h2>
          <ul className="list-disc list-inside">
            {schedule.map((item, idx) => (
              <li key={idx}>
                {item.dayOfWeek}: {item.startTime} - {item.endTime} ({item.subjectName})
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleAssignGroup}
        disabled={!selectedGroupId}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Regjistrohu në grup
      </button>
    </div>
  );
};

export default GroupRegister;
