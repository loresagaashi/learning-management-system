import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { CourseService } from '../../../../service/CourseService';
import { LectureService } from '../../../../service/LectureService';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../../service/QueryKeys';
import CourseInfoCard from './CourseInfoCard';
import LectureList from './LectureList';
import LectureDialog from './LectureDialog';
import CourseNavigationDrawer from './CourseNavigationDrawer';
import CourseMaterials from './CourseMaterials';
import UploadMaterialDialog from './UploadMaterialDialog';
import StudentList from './StudentList';

const lectureService = new LectureService();
const courseService = new CourseService();

export default function ProfessorCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [openLectureDialog, setOpenLectureDialog] = useState(false);
  const [lectureName, setLectureName] = useState('');
  const [lectureDescription, setLectureDescription] = useState('');
  const [lectureMaterials, setLectureMaterials] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadLectureId, setUploadLectureId] = useState(null);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      if (!courseId && courses?.length > 0) {
        const firstCourse = courses[0];
        navigate(`/professor/lms/course/${firstCourse.id}`);
        return;
      }

      const courseResponse = await courseService.findById(courseId);
      setCourse(courseResponse);

      const professorsResponse = await courseService.getProfessorsByCourse(courseId);
      setProfessors(professorsResponse || []);

      const lecturesResponse = await courseService.getLecturesByCourse(courseId);
      setLectures(lecturesResponse || []);

      const studentsResponse = await courseService.getStudentsByCourse(courseId);
      setStudents(studentsResponse || []);
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const { isLoading, isError, data: allCourses } = useQuery(
    QueryKeys.COURSE,
    () => courseService.findAll()
  );

  useEffect(() => {
    fetchCourseData();
  }, [courseId, courses, navigate, allCourses]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/choice/sign-in');
  };

  const handleAddLecture = (lecture) => {
    setSelectedLecture(lecture);
    setLectureName(lecture.name);
    setLectureDescription(lecture.description);
    setLectureMaterials(lecture.materials || []);
    setOpenLectureDialog(true);
  };

  const handleEditLecture = (lecture) => {
    setSelectedLecture(lecture);
    setLectureName(lecture.name);
    setLectureDescription(lecture.description);
    setLectureMaterials(lecture.materials || []);
    setOpenLectureDialog(true);
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      setLoading(true);
      await lectureService.deleteLecture(lectureId);
      await fetchCourseData();
    } catch (error) {
      console.error('Error deleting lecture:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = () => {
    setLectureMaterials([...lectureMaterials, { name: '', url: '' }]);
  };

  const handleMaterialChange = (index, field, value) => {
    const materials = [...lectureMaterials];
    materials[index][field] = value;
    setLectureMaterials(materials);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadMaterial = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('lectureId', selectedLecture?.id);

      const response = await lectureService.uploadMaterialToLecture(formData);

      setLectureMaterials(prev => [
        ...prev,
        {
          name: selectedFile.name,
          url: response.url || ''
        }
      ]);

      setSelectedFile(null);
    } catch (error) {
      if (error.response) {
        console.error('Upload error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Other error:', error.message);
      }
    }
  };

  const handleSaveLecture = async () => {
    try {
      setLoading(true);
      const lectureData = {
        name: lectureName,
        description: lectureDescription,
        materials: lectureMaterials,
        courseId: courseId
      };

      if (selectedLecture) {
        await lectureService.updateLecture(selectedLecture.id, lectureData);
      } else {
        await lectureService.createLecture(lectureData);
      }
      await fetchCourseData();
      setOpenLectureDialog(false);
    } catch (error) {
      console.error('Error saving lecture:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100vh', overflowY: 'auto' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {course?.name || 'Select a Course'}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>

      <CourseNavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        courses={courses}
        courseId={courseId}
        navigate={navigate}
      />

      <Box style={{ display: 'flex', gap: '16px' }}>
        <Box style={{ width: '250px', flexShrink: 0 }}>
          <CourseInfoCard course={course} professors={professors} />
          <CourseMaterials courses={allCourses} courseId={courseId} navigate={navigate} />
        </Box>

        <Box style={{ flex: 1 }}>
          <LectureList
            lectures={lectures}
            onAddLecture={handleAddLecture}
            onEditLecture={handleEditLecture}
            onAddMaterial={handleAddMaterial}
            uploadLectureId={uploadLectureId}
            setUploadLectureId={setUploadLectureId}
            setUploadDialogOpen={setUploadDialogOpen}
          />
        </Box>

        <Box style={{ width: '200px', flexShrink: 0 }}>
          <StudentList
            students={students}
            lectures={lectures}
          />
        </Box>
      </Box>

      <LectureDialog
        open={openLectureDialog}
        onClose={() => setOpenLectureDialog(false)}
        onSave={handleSaveLecture}
        lectureName={lectureName}
        setLectureName={setLectureName}
        lectureDescription={lectureDescription}
        setLectureDescription={setLectureDescription}
        lectureMaterials={lectureMaterials}
        setLectureMaterials={setLectureMaterials}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleFileSelect={handleFileSelect}
        handleUploadMaterial={handleUploadMaterial}
        selectedLecture={selectedLecture}
      />

      <UploadMaterialDialog
        open={uploadDialogOpen}
        onClose={() => {setUploadDialogOpen(false); fetchCourseData();}}
        lectureId={uploadLectureId}
      />
    </Box>
  );
}
