import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";

const ProfessorExamApplications = () => {
  const { user } = useUser();
  const professorId = user?.user?.id;

  const [examApplications, setExamApplications] = useState([]);
  const [grading, setGrading] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (professorId) {
      fetchApplications();
    }
  }, [professorId]);

  const fetchApplications = () => {
    axios
      .get(`http://localhost:8080/exam-applications/by-professor/${professorId}`)
      .then((res) => {
        setExamApplications(res.data);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së aplikimeve", err);
        setError("Nuk u arrit të ngarkohen aplikimet për provim.");
      });
  };

  const handleGradeChange = (examId, studentId, value) => {
    setGrading((prev) => ({
      ...prev,
      [`${examId}-${studentId}`]: value,
    }));
  };

  const submitGrade = (examId, studentId) => {
    const grade = grading[`${examId}-${studentId}`];
    if (!grade) {
      setError("Ju lutem zgjidhni një notë.");
      return;
    }

    axios
      .post(
        `http://localhost:8080/exam-applications/grade?examId=${examId}&studentId=${studentId}&grade=${grade}`
      )
      .then(() => {
        setSuccess("Nota u vendos me sukses.");
        setError("");
        fetchApplications(); // rifresko listen
      })
      .catch((err) => {
        console.error("Gabim gjatë dërgimit të notës", err);
        setError("Nuk u arrit të vendoset nota.");
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Aplikimet për Provim</h1>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {examApplications.length === 0 ? (
        <p className="text-gray-600">Nuk ka aplikime për provime.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Studenti</th>
              <th className="p-2 border">Lënda</th>
              <th className="p-2 border">Data e Provimit</th>
              <th className="p-2 border">Statusi</th>
              <th className="p-2 border">Notimi</th>
            </tr>
          </thead>
          <tbody>
            {examApplications.map((exam, index) => (
              <tr key={index}>
                <td className="p-2 border">{exam.studentFullName}</td>
                <td className="p-2 border">{exam.courseName}</td>
                <td className="p-2 border">{exam.examDate}</td>
                <td className="p-2 border">{exam.status}</td>
                <td className="p-2 border">
                  {exam.status === "REGISTERED" ? (
                    <div className="flex gap-2 items-center">
                      <select
                        className="border rounded px-2 py-1"
                        value={grading[`${exam.examId}-${exam.studentId}`] || ""}
                        onChange={(e) =>
                          handleGradeChange(exam.examId, exam.studentId, e.target.value)
                        }
                      >
                        <option value="">Zgjidh</option>
                        {[6, 7, 8, 9, 10].map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
                        onClick={() => submitGrade(exam.examId, exam.studentId)}
                      >
                        Vendos Notën
                      </button>
                    </div>
                  ) : (
                    <span className="text-green-700">Notuar</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfessorExamApplications;
