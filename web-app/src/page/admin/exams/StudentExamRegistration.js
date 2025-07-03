import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";

const StudentExamRegistration = () => {
  const { user } = useUser();
  const userId = user?.user?.id;
  const [unpassedCourses, setUnpassedCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/courses/unpassed/${userId}`)
        .then((res) => setUnpassedCourses(res.data))
        .catch((err) => {
          console.error("Gabim gjatë ngarkimit të provimeve", err);
          setMessage("Nuk u arrit të ngarkohen provimet.");
        });
    }
  }, [userId]);

  const handleExamRegistration = async (examId) => {
    try {
      await axios.post(
        `http://localhost:8080/exam-applications/register?examId=${examId}&studentId=${userId}`
      );
      setMessage("U paraqite me sukses për provim.");
      // Përditëso listën
      setUnpassedCourses((prev) => prev.filter((c) => c.examId !== examId));
    } catch (error) {
      console.error("Gabim gjatë paraqitjes", error);
      setMessage("Nuk u arrit paraqitja për këtë provim.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Paraqitja e Provimeve</h1>

      {message && <div className="mb-4 text-blue-600">{message}</div>}

      {unpassedCourses.length === 0 ? (
        <p className="text-gray-600">Nuk ka provime të pa kaluara për paraqitje.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Lënda</th>
              <th className="p-2 border">Profesori</th>
              <th className="p-2 border">Data e Provimit</th>
              <th className="p-2 border">Veprimi</th>
            </tr>
          </thead>
          <tbody>
            {unpassedCourses.map((course) => (
              <tr key={course.examId}>
                <td className="p-2 border">{course.courseName}</td>
                <td className="p-2 border">{course.professorName}</td>
                <td className="p-2 border">{course.examDate || "N/A"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleExamRegistration(course.examId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Paraqit Provimin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentExamRegistration;
