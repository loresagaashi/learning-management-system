import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LMSPageProfessor from './LMSPageProfessor';
import CourseDetail from './components/ProfessorCourseDetail';

const ProfessorLMSLayout = () => {
  return (
    <Routes>
      <Route path="" element={<LMSPageProfessor />} />
      <Route path="course/:courseId" element={<CourseDetail />} />
      <Route path="*" element={<Navigate to="/professor/lms" replace />} />
    </Routes>
  );
};

export default ProfessorLMSLayout;
