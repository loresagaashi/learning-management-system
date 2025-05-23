import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  makeStyles,
  CssBaseline,
  CircularProgress,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Box,
} from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser"; 

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    padding: theme.spacing(4),
    background: "#f5f7fa",
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
    fontSize: "28px",
    color: "#333",
    textAlign: "center",
  },
  card: {
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 160,
    position: "relative",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    padding: theme.spacing(1, 2),
  },
  courseCount: {
    fontSize: "0.875rem",
    color: "#fff",
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
  appBar: {
    backgroundColor: "#2c3e50",
  },
  logoutButton: {
    marginLeft: "auto",
    color: "#fff",
  },
  breadcrumbs: {
    marginBottom: theme.spacing(3),
    "& .MuiLink-root": {
      cursor: "pointer",
    },
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
  optionButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const LMSPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setUser } = useUser(); // 
  
  
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("categories"); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [degreeLevels, setDegreeLevels] = useState(["Bachelor", "Master"]);
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState(null);
  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    
    if (currentStep === "degreeLevel" && selectedCategory) {
      setLoading(false);
    } else if (currentStep === "generation" && selectedDegreeLevel) {
      fetchGenerations();
    } else if (currentStep === "semester" && selectedGeneration) {
      fetchSemesters();
    } else if (currentStep === "courses" && selectedSemester) {
      fetchCourses();
    }
  }, [currentStep, selectedCategory, selectedDegreeLevel, selectedGeneration, selectedSemester]);

  const fetchCategories = () => {
    setLoading(true);
    const mockCategories = [
      { id: 1, name: "Menaxhment, Biznes dhe Ekonomi", courseCount: 5, image: "https://images.pexels.com/photos/7580854/pexels-photo-7580854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 2, name: "Shkenca Kompjuterike dhe Inxhinieri", courseCount: 10, image: "https://images.pexels.com/photos/12899157/pexels-photo-12899157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 3, name: "Mekatronike", courseCount: 3, image: "https://images.pexels.com/photos/8294620/pexels-photo-8294620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 4, name: "Sistemet e informacionit", courseCount: 1, image: "https://images.pexels.com/photos/17489153/pexels-photo-17489153/free-photo-of-light-on-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 5, name: "Juridik", courseCount: 8, image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 7, name: "Arkitekture dhe Planifikim Hapesinor", courseCount: 3, image: "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 8, name: "Shkenca Politike", courseCount: 3, image: "https://images.pexels.com/photos/8731034/pexels-photo-8731034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 9, name: "Media dhe Komunikim", courseCount: 3, image: "https://images.pexels.com/photos/10809856/pexels-photo-10809856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { id: 10, name: "Inxhinieri Ndertimore", courseCount: 3, image: "https://images.pexels.com/photos/532079/pexels-photo-532079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    ];
    
    // Uncomment this for real API call
    /*
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setLoading(false);
      });
    */
    
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  };

  const fetchGenerations = () => {
    setLoading(true);
    const mockGenerations = [
      { id: 1, name: "2020-2021" },
      { id: 2, name: "2022-2023" },
      { id: 3, name: "2024-2025" },
    ];
    
    setTimeout(() => {
      setGenerations(mockGenerations);
      setLoading(false);
    }, 500);
  };

  const fetchSemesters = () => {
    setLoading(true);
    const mockSemesters = [
      { id: 1, name: "Semester 1" },
      { id: 2, name: "Semester 2" },
      { id: 3, name: "Semester 3" },
      { id: 4, name: "Semester 4" },
      { id: 5, name: "Semester 5" },
      { id: 6, name: "Semester 6" },
    ];
    
    setTimeout(() => {
      setSemesters(mockSemesters);
      setLoading(false);
    }, 500);
  };

  const fetchCourses = () => {
    setLoading(true);
    const mockCourses = [
      { id: 1, name: "Lenda Laboratorike", credits: 3 },
      { id: 2, name: "Algoritme dhe Struktura e te Dhenave", credits: 4 },
      { id: 3, name: "Web Development", credits: 3 },
      { id: 4, name: "Database", credits: 4 },
      { id: 5, name: "Big Data", credits: 4 },
      { id: 6, name: "Struktura Diskrete", credits: 4 },
    ];
    
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 500);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep("degreeLevel");
  };

  const handleDegreeLevelSelect = (level) => {
    setSelectedDegreeLevel(level);
    setCurrentStep("generation");
  };

  const handleGenerationSelect = (generation) => {
    setSelectedGeneration(generation);
    setCurrentStep("semester");
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    setCurrentStep("courses");
  };

  const handleBack = () => {
    if (currentStep === "degreeLevel") {
      setCurrentStep("categories");
      setSelectedCategory(null);
    } else if (currentStep === "generation") {
      setCurrentStep("degreeLevel");
      setSelectedDegreeLevel(null);
    } else if (currentStep === "semester") {
      setCurrentStep("generation");
      setSelectedGeneration(null);
    } else if (currentStep === "courses") {
      setCurrentStep("semester");
      setSelectedSemester(null);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser?.(null); 
    navigate("/choice/sign-in");
  };

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      { label: "Categories", step: "categories" },
    ];
    
    if (selectedCategory) {
      breadcrumbs.push({ label: selectedCategory.name, step: "degreeLevel" });
    }
    
    if (selectedDegreeLevel) {
      breadcrumbs.push({ label: selectedDegreeLevel, step: "generation" });
    }
    
    if (selectedGeneration) {
      breadcrumbs.push({ label: selectedGeneration.name, step: "semester" });
    }
    
    if (selectedSemester) {
      breadcrumbs.push({ label: selectedSemester.name, step: "courses" });
    }
    
    return (
      <Breadcrumbs className={classes.breadcrumbs}>
        {breadcrumbs.map((item, index) => (
          <Link
            key={index}
            color="inherit"
            onClick={() => setCurrentStep(item.step)}
            style={{ cursor: "pointer" }}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      );
    }

    switch (currentStep) {
      case "categories":
        return renderCategories();
      case "degreeLevel":
        return renderDegreeLevels();
      case "generation":
        return renderGenerations();
      case "semester":
        return renderSemesters();
      case "courses":
        return renderCourses();
      default:
        return renderCategories();
    }
  };

  const renderCategories = () => {
    return (
      <>
        <Typography className={classes.title}>
          Course Categories
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => handleCategorySelect(category)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={category.image || `/placeholder.svg?height=160&width=300`}
                    title={category.name}
                  >
                    <Box className={classes.cardOverlay}>
                      <Typography variant="subtitle1" component="h3">
                        {category.name}
                      </Typography>
                      <Typography className={classes.courseCount}>
                        {category.courseCount} COURSES
                      </Typography>
                    </Box>
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderDegreeLevels = () => {
    return (
      <>
        <Button
          className={classes.backButton}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Typography className={classes.title}>
          Select Degree Level for {selectedCategory?.name}
        </Typography>
        <Grid container spacing={3}>
          {degreeLevels.map((level, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => handleDegreeLevelSelect(level)}>
                  <CardContent>
                    <Typography variant="h5" component="h2" align="center">
                      {level}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderGenerations = () => {
    return (
      <>
        <Button
          className={classes.backButton}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Typography className={classes.title}>
          Select Student Generation
        </Typography>
        <Grid container spacing={3}>
          {generations.map((generation) => (
            <Grid item xs={12} sm={6} md={4} key={generation.id}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => handleGenerationSelect(generation)}>
                  <CardContent>
                    <Typography variant="h5" component="h2" align="center">
                      {generation.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderSemesters = () => {
    return (
      <>
        <Button
          className={classes.backButton}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Typography className={classes.title}>
          Select Semester
        </Typography>
        <Grid container spacing={3}>
          {semesters.map((semester) => (
            <Grid item xs={12} sm={6} md={3} key={semester.id}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => handleSemesterSelect(semester)}>
                  <CardContent>
                    <Typography variant="h5" component="h2" align="center">
                      {semester.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderCourses = () => {
    return (
      <>
        <Button
          className={classes.backButton}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Typography className={classes.title}>
          Available Courses for {selectedSemester?.name}
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Credits: {course.credits}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.optionButton}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">LMS Portal</Typography>
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogOut}
            className={classes.logoutButton}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <Container maxWidth="lg">
          {renderBreadcrumbs()}
          {renderContent()}
        </Container>
      </div>
    </>
  );
};

export default LMSPage;