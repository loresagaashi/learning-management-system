import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";


const StudentExam = ({ studentId }) => {
  const [examGrades, setExamGrades] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useUser();
  //const studentId = user?.user?.studentId;
  const userId = user?.user?.id;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/exam-applications/unmarked/${userId}`)
      .then((response) => {
        setExamGrades(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam grades:", error);
      })
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <p className="text-center">Loading exams...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Exam Grades</h2>
      {examGrades.length === 0 ? (
        <p className="text-center text-gray-500">No exams attended yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Course Name</th>
                <th className="px-4 py-2 text-left">Exam Title</th>
                <th className="px-4 py-2 text-left">Exam Location</th>
                <th className="px-4 py-2 text-left">Grade</th>

              </tr>
            </thead>
            <tbody>
              {examGrades.map((examGrade, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{examGrade.courseName}</td>
                  <td className="px-4 py-2">{examGrade.examTitle}</td>
                  <td className="px-4 py-2">{examGrade.location}</td>
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

export default StudentExam;
