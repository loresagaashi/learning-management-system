import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";

const StudentGrades = () => {
  const [examGrades, setExamGrades] = useState([]);
  const [averageGrade, setAverageGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const userId = user?.user?.id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/exam-applications/passed/${userId}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data.passedExams)) {
          setExamGrades(data.passedExams);
          setAverageGrade(data.averageGrade);
        } else {
          console.error("Expected passedExams to be an array, got:", data.passedExams);
          setExamGrades([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching exam grades:", error);
        setExamGrades([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className="text-center">Loading exams...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Exam Grades</h2>
      {averageGrade !== null && (
        <p className="text-lg font-medium mb-4 text-gray-700">
          Average Grade: <span className="font-bold text-blue-600">{averageGrade}</span>
        </p>
      )}
      {examGrades.length === 0 ? (
        <p className="text-center text-gray-500">No exams attended yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Course Name</th>
                <th className="px-4 py-2 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {examGrades.map((examGrade, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{examGrade.courseName}</td>
                  <td className="px-4 py-2">{examGrade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentGrades;
