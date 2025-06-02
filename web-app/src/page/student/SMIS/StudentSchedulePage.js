// src/pages/StudentSchedulePage.js

import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";

const StudentSchedulePage = () => {
  const { user } = useUser();
  const userId = user?.user?.id;

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/schedules/students/${userId}/schedule`
        );
        setSchedule(response.data);
      } catch (err) {
        setError("Nuk u mundësua të merret orari.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userId]);

  if (loading) return <p>Duke u ngarkuar orari...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orari i Grupit Tuaj </h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Dita</th>
            <th className="px-4 py-2 border">Ora Fillimit</th>
            <th className="px-4 py-2 border">Ora Mbarimit</th>
            <th className="px-4 py-2 border">Lënda</th>
            <th className="px-4 py-2 border">Profesori</th>
            <th className="px-4 py-2 border">Salla</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index} className="text-center border-t">
              <td className="px-4 py-2 border">{item.dayOfWeek}</td>
              <td className="px-4 py-2 border">{item.startTime}</td>
              <td className="px-4 py-2 border">{item.endTime}</td>
              <td className="px-4 py-2 border">{item.courseName}</td>
              <td className="px-4 py-2 border">{item.professorName}</td>
              <td className="px-4 py-2 border">{item.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSchedulePage;
