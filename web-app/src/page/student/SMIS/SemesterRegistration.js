import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";

const SemesterRegistration = () => {
  const { user } = useUser();
  const studentId = user?.user?.studentId;
  const userId=user?.user?.id;

  const [semesterList, setSemesterList] = useState([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState("");
  const [registeredSemesters, setRegisteredSemesters] = useState([]);

  const generationNameFromStudentId = (id) => {
    const idStr = String(id);
    if (!idStr || idStr.length < 4) return null;
    
    // Extract the year from student ID (first 4 digits)
    const yearPrefix = idStr.substring(0, 4);
    const firstYear = parseInt(yearPrefix.substring(0, 2));
    const secondYear = parseInt(yearPrefix.substring(2, 4));
    
    // Convert to full year format (e.g., 25 -> 2025, 26 -> 2026)
    const fullFirstYear = 2000 + firstYear;
    const fullSecondYear = 2000 + secondYear;
    
    return `${fullFirstYear}/${fullSecondYear}`;
  };

  const generationName = generationNameFromStudentId(studentId);

  // 1. Load Semesters by Generation
  useEffect(() => {
    if (generationName) {
      axios
        .post("http://localhost:8080/semester/by-generation", {
          generationName,
        })
        .then((res) => setSemesterList(res.data))
        .catch((err) => console.error("Failed to fetch semesters", err));
    }
  }, [generationName]);

  // 2. Load Student Registered Semesters
  const fetchRegisteredSemesters = () => {
    if (!studentId) return;

    axios
      .get(
        `http://localhost:8080/student-semester/semesters-by-studentId?studentId=${userId}`
      )
      .then((res) => setRegisteredSemesters(res.data))
      .catch((err) =>
        console.error("Failed to fetch registered semesters", err)
      );
  };

  useEffect(() => {
    fetchRegisteredSemesters();
  }, [studentId]);

  // 3. Register Student in Semester
  const handleRegister = () => {
    if (!selectedSemesterId || !studentId) return;

    axios
      .post(
        `http://localhost:8080/student-semester/register?studentId=${userId}&semesterId=${selectedSemesterId}`
      )
      .then(() => {
        alert("Successfully registered!");
        fetchRegisteredSemesters();
      })
      .catch((err) => {
        alert("Registration failed.");
        console.error(err);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Register in a Semester</h2>
      <select
        value={selectedSemesterId}
        onChange={(e) => setSelectedSemesterId(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        <option value="">Select Semester</option>
        {semesterList.map((semester) => (
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleRegister}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        REGISTER
      </button>

      <div style={{ marginTop: "30px" }}>
        <h3>Lista e regjistrimeve të semestrave</h3>
        {registeredSemesters.length === 0 ? (
          <p>You haven't registered in any semester yet.</p>
        ) : (
          <ul>
  {registeredSemesters.map((sem) => (
    <li key={sem.semesterId}>
      {sem.semesterName} - {new Date(sem.registrationDate).toLocaleDateString()} - {sem.season} 
       {/* {new Date(sem.startDate).toLocaleDateString()} */}
    </li>
  ))}
</ul>

        )}
      </div>
    </div>
  );
};

export default SemesterRegistration;
