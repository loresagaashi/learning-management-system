import { useState } from "react";
import LectureSelect from "./components/LectureSelect";
import DegreeLevelSelect from "./components/DegreeLevelSelect";
import GenerationSelect from "./components/GenerationSelect";
import SemesterSelect from "./components/SemesterSelect";
import CoursesSelect from "./components/CoursesSelect";
import { Breadcrumbs, Typography, Link, Box, Button, useTheme, useMediaQuery, styled } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
  logoutButton: {
    marginLeft: "auto",
    color: "#fff",
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(6),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 100,
  borderRadius: theme.shape.borderRadius,
}));

const steps = [
  { label: "Category", key: "selectedCategory" },
  { label: "Degree", key: "selectedDegreeLevel" },
  { label: "Generation", key: "selectedGeneration" },
  { label: "Semester", key: "selectedSemester" },
  { label: "Courses", key: "selectedCourses" },
];

const LMSPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !selectedCategory;
      case 2:
        return !selectedDegreeLevel;
      case 3:
        return !selectedGeneration;
      case 4:
        return !selectedSemester;
      case 5:
        return selectedCourses.length === 0;
      default:
        return true;
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser?.(null);
    navigate("/choice/sign-in");
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = {
    1: (val) => {
      setSelectedCategory(val);
      handleNext();
    },
    2: (val) => {
      setSelectedDegreeLevel(val);
      handleNext();
    },
    3: setSelectedGeneration,
    4: setSelectedSemester,
    5: setSelectedCourses,
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <LectureSelect
            value={selectedCategory}
            onChange={handleChange[1]}
          />
        );
      case 2:
        return (
          <DegreeLevelSelect
            value={selectedDegreeLevel}
            onChange={handleChange[2]}
          />
        );
      case 3:
        return (
          <GenerationSelect
            value={selectedGeneration}
            onChange={handleChange[3]}
            degreeType={selectedDegreeLevel}
          />
        );
      case 4:
        return (
          <SemesterSelect
            value={selectedSemester}
            onChange={handleChange[4]}
            generationName={selectedGeneration?.name}
          />
        );
      case 5:
        return (
          <CoursesSelect
            value={selectedCourses}
            onChange={handleChange[5]}
            semester={selectedSemester?.name}
          />
        );
      default:
        return <Typography>All steps completed!</Typography>;
    }
  };

  const renderBreadcrumbs = () => (
    <Breadcrumbs aria-label="breadcrumb">
      {steps.map(({ label }, index) => {
        const currentStep = index + 1;
        if (currentStep === step) {
          return (
            <Typography key={label} fontWeight="bold" color="text.primary">
              {label}
            </Typography>
          );
        } else if (currentStep < step) {
          return (
            <Link
              key={label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setStep(currentStep);
              }}
              color="inherit"
            >
              {label}
            </Link>
          );
        } else {
          return (
            <Typography key={label} color="text.secondary">
              {label}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );

  return (
    <StyledContainer>
      <Button
        color="inherit"
        onClick={handleLogOut}
        className={classes.logoutButton}
      >
        Log Out
      </Button>
      <Box mb={4}>{renderBreadcrumbs()}</Box>
      <Box mb={4}>{renderContent()}</Box>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        mt={4}
      >
        <StyledButton onClick={handleBack} disabled={step === 1} variant="outlined">
          Back
        </StyledButton>
        <StyledButton
          onClick={handleNext}
          disabled={step === steps.length || isNextDisabled()}
          variant="contained"
          color="primary"
        >
          Next
        </StyledButton>
      </Box>
    </StyledContainer>
  );
};

export default LMSPage;
