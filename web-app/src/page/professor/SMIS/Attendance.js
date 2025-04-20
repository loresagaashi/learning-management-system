import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = ({ professorId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // 🧠 Debug: Make sure professorId is passed correctly
  useEffect(() => {
    console.log("professorId: ", professorId);
  }, []);

  // Load courses for the professor
  useEffect(() => {
    if (professorId) {
      axios
        .get(`/api/professors/${professorId}/courses`)
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.error("Failed to load courses", err);
        });
    }
  }, [professorId]);

  // Load lectures & students when course is selected
  useEffect(() => {
    if (selectedCourse) {
      // Fetch lectures for selected course
      axios
        .get(`/api/courses/${selectedCourse}/lectures`)
        .then((res) => {
          setLectures(res.data);
        })
        .catch((err) => {
          console.error("Failed to load lectures", err);
        });

      // Fetch students for selected course
      axios
        .get(`/api/courses/${selectedCourse}/students`)
        .then((res) => {
          setStudents(res.data);
          const initialAttendance = {};
          res.data.forEach((student) => {
            initialAttendance[student.id] = false; // Default attendance is false
          });
          setAttendance(initialAttendance);
        })
        .catch((err) => {
          console.error("Failed to load students", err);
        });
    }
  }, [selectedCourse]);

  // Handle checkbox change for student attendance
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Handle the submit button for recording attendance
  const handleSubmit = () => {
    const studentIds = Object.keys(attendance).filter((id) => attendance[id]);
    axios
      .post(`/api/attendances/record`, {
        lectureId: selectedLecture,
        studentIds,
        present: true,
      })
      .then(() => {
        alert("Attendance recorded successfully.");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to record attendance.");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Record Attendance</h2>

      {/* Course Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Course:</label>
        <select
          className="border rounded p-2 w-full"
          value={selectedCourse || ""}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Lecture Selection */}
      {lectures.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Lecture:</label>
          <select
            className="border rounded p-2 w-full"
            value={selectedLecture || ""}
            onChange={(e) => setSelectedLecture(e.target.value)}
          >
            <option value="">-- Select Lecture --</option>
            {lectures.map((lecture) => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.title || `Lecture ${lecture.number}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Students and Attendance Checkboxes */}
      {students.length > 0 && selectedLecture && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Students:</h3>
          <table className="min-w-full border border-gray-300 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={attendance[student.id] || false}
                      onChange={() => handleAttendanceChange(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Button */}
      {selectedLecture && students.length > 0 && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Attendance
        </button>
      )}
    </div>
  );
};

export default Attendance;
