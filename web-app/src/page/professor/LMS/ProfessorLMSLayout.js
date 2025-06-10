import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LMSPageProfessor from './LMSPageProfessor';
import CourseDetail from './components/ProfessorCourseDetail';
import LectureSubmissions from './components/LectureSubmissions';

const ProfessorLMSLayout = () => {
  return (
    <Routes>
      <Route path="" element={<LMSPageProfessor />} />
      <Route path="course/:courseId" element={<CourseDetail />} />
      <Route path="course/:courseId/lecture/:lectureId/submissions" element={<LectureSubmissions />} />
      <Route path="*" element={<Navigate to="/professor/lms" replace />} />
    </Routes>
  );
};

export default ProfessorLMSLayout;
