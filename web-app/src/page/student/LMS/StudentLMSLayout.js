import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LMSPage from './LMSPage';
import StudentCourseDetail from './components/StudentCourseDetail';

const StudentLMSLayout = () => {
  return (
    <Routes>
      <Route path="" element={<LMSPage />} />
      <Route path="course/:courseId" element={<StudentCourseDetail />} />
      <Route path="*" element={<Navigate to="/student/lms" replace />} />
    </Routes>
  );
};

export default StudentLMSLayout;
