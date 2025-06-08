import React, { useEffect, useState } from "react";
import axios from "axios";
import useUser from "../../../hooks/useUser";

const StudentPassedExams = () => {
  const { user } = useUser();
  const studentId = user?.user?.id;

  const [passedExams, setPassedExams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8080/exam-applications/passed/${studentId}`)
        .then((res) => {
          setPassedExams(res.data);
        })
        .catch((err) => {
          console.error("Gabim gjatë marrjes së provimeve të kaluara", err);
          setError("Nuk u arrit të ngarkohen provimet e kaluara.");
        });
    }
  }, [studentId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Provimet e Kaluara</h1>

      {error && <p className="text-red-600">{error}</p>}

      {passedExams.length === 0 ? (
        <p className="text-gray-600">Nuk ka të dhëna për provime të kaluara.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Lënda</th>
              <th className="p-2 border">Profesori</th>
              <th className="p-2 border">Nota</th>
              <th className="p-2 border">Data e Provimit</th>
            </tr>
          </thead>
          <tbody>
            {passedExams.map((exam, index) => (
              <tr key={index}>
                <td className="p-2 border">{exam.courseName}</td>
                <td className="p-2 border">{exam.professorName}</td>
                <td className="p-2 border">{exam.grade}</td>
                <td className="p-2 border">{exam.examDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentPassedExams;
