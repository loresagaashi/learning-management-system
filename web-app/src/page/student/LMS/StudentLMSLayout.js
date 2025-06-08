import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LMSPage from './LMSPage';
import CourseDetail from './components/CourseDetail';

const StudentLMSLayout = () => {
  return (
    <Routes>
      <Route path="" element={<LMSPage />} />
      <Route path="course/:courseId" element={<CourseDetail />} />
      <Route path="*" element={<Navigate to="/student/lms" replace />} />
    </Routes>
  );
};

export default StudentLMSLayout;
