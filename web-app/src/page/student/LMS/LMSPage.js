import React, { useState } from "react";
import LectureSelect from "./components/LectureSelect";
import DegreeLevelSelect from "./components/DegreeLevelSelect";
import GenerationSelect from "./components/GenerationSelect";
import SemesterSelect from "./components/SemesterSelect";
import CoursesSelect from "./components/CoursesSelect";
import {
  Breadcrumbs,
  Typography,
  Link,
  Grid,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  styled
} from "@mui/material";
import { useQuery } from 'react-query';
import { QueryKeys } from '../../../service/QueryKeys';
import { CourseService } from '../../../service/CourseService';

const courseService = new CourseService();

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(6),
}));

const StyledButton = styled(Paper)(({ theme }) => ({
  px: 2,
  py: 1,
  borderRadius: 1,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  minWidth: 100,
  textAlign: 'center',
  '&:hover': {
    bgcolor: theme.palette.primary.main,
    color: 'white',
  },
  '&:disabled': {
    bgcolor: theme.palette.action.disabled,
    cursor: 'not-allowed',
  },
}));

const LMSPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [step, setStep] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const categories = [
    "Shkenca Kompjuterike dhe Inxhinieri",
    "Menaxhment, Biznes dhe Ekonomi",
    "Juridik",
    "Inxhinieri Ndertimore",
    "Sisteme te Informacionit",
    "Mekatronike"
  ];
  const degreeLevels = ["Bachelor", "Master"];
  // Generations are now fetched from the backend in the GenerationSelect component
  // Semesters are now fetched from the backend in the SemesterSelect component
  // Courses are now fetched from the backend in the CoursesSelect component

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderContent = () => {
    switch (step) {
      case 1:
        const handleCategoryChange = (category) => {
          setSelectedCategory(category);
          handleNext();
        };
        return (
          <LectureSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
          />
        );
      case 2:
        const handleDegreeChange = (level) => {
          setSelectedDegreeLevel(level);
          handleNext();
        };
        return (
          <DegreeLevelSelect
            value={selectedDegreeLevel}
            onChange={handleDegreeChange}
          />
        );
      case 3:
        return (
          <GenerationSelect
            value={selectedGeneration}
            onChange={setSelectedGeneration}
            degreeType={selectedDegreeLevel}
          />
        );
      case 4:
        console.log("LMSPage (renderStepContent): Passing to SemesterSelect - generationName:", selectedGeneration?.name);
        return (
          <SemesterSelect
            value={selectedSemester}
            onChange={setSelectedSemester}
            generationName={selectedGeneration?.name}
          />
        );
      case 5:
        return (
          <CoursesSelect
            value={selectedCourses}
            onChange={setSelectedCourses}
            semester={selectedSemester}
          />
        );
      default:
        return <div>All steps completed!</div>;
    }
  };

  // Custom breadcrumb navigation based on current step
  const renderBreadcrumbs = () => {
    const steps = [
      { label: "Category", step: 1 },
      { label: "Degree", step: 2 },
      { label: "Generation", step: 3 },
      { label: "Semester", step: 4 },
      { label: "Courses", step: 5 }
    ];

    return (
      <Breadcrumbs aria-label="breadcrumb">
        {steps.map((item, index) => {
          const isActive = item.step === step;
          const isPast = item.step < step;

          if (isActive) {
            return (
              <Typography key={index} color="text.primary" fontWeight="bold">
                {item.label}
              </Typography>
            );
          } else if (isPast) {
            return (
              <Link
                key={index}
                color="inherit"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(item.step);
                }}
              >
                {item.label}
              </Link>
            );
          } else {
            return (
              <Typography key={index} color="text.secondary">
                {item.label}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    );
  };

  return (
    <StyledContainer>
      <Box sx={{ mb: 4 }}>
        {renderBreadcrumbs()}
      </Box>
      <Box sx={{ mb: 4 }}>
        {renderContent()}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 4
        }}
      >
        <StyledButton
          onClick={handleBack}
          disabled={step === 1}
        >
          <Typography variant="button">Back</Typography>
        </StyledButton>
        <StyledButton
          onClick={handleNext}
          disabled={step === 5}
        >
          <Typography variant="button">Next</Typography>
        </StyledButton>
      </Box>
    </StyledContainer>
  );
};

export default LMSPage;