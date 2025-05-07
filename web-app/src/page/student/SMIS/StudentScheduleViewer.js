import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export default function StudentScheduleViewer() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [semester, setSemester] = useState("");

  const { data: groups } = useQuery("studentGroups", () =>
    axios.get("/api/student-groups").then((res) => res.data)
  );

  const { data: schedule } = useQuery(
    ["scheduleByGroupSemester", selectedGroupId, semester],
    () =>
      axios
        .get(`/api/schedules/group/${selectedGroupId}/semester/${semester}`)
        .then((res) => res.data),
    {
      enabled: !!selectedGroupId && !!semester,
    }
  );

  return (
    <div>
      <h2>Zgjedh grupin dhe semestrin</h2>

      <select onChange={(e) => setSelectedGroupId(e.target.value)}>
        <option value="">-- Zgjedh grupin --</option>
        {groups?.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSemester(e.target.value)}>
        <option value="">-- Zgjedh semestrin --</option>
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <option key={s} value={s}>
            Semestri {s}
          </option>
        ))}
      </select>

      {schedule && (
        <div>
          <h3>Orari</h3>
          <ul>
            {schedule.map((s) => (
              <li key={s.id}>
                {s.dayOfWeek} – {s.startTime} - {s.endTime} ({s.course.name} me {s.professor.firstName})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
