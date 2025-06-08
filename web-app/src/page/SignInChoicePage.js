import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
  },
  formContainer: {
    backgroundColor: "white",
    padding: theme.spacing(4),
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    background:
      "linear-gradient(130deg, rgb(199, 222, 241) 20%, rgb(217, 236, 251) 50%, rgb(199, 222, 241) 80%)",
  },
  title: {
    marginBottom: theme.spacing(4),
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
    fontSize: "24px",
    color: "#333",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(1.5),
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
}));

export default function SignInChoicePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isRoleChosen, setIsRoleChosen] = useState(false);
  const [role, setRole] = useState("");

  // Check if the user is logged in (you can adjust this based on your auth state)
  const isLoggedIn = false; // Set this according to your authentication state logic

  useEffect(() => {
    // Redirect if logged in (if needed, this logic can be more complex)
    if (isLoggedIn) {
      navigate("/dashboard"); // Adjust based on your app's redirect logic
    }
  }, [isLoggedIn, navigate]);

  // Handle the role selection (Student or Professor)
  const handleStudentSignIn = () => {
    setRole("student");
    setIsRoleChosen(true);
  };

  const handleProfessorSignIn = () => {
    setRole("professor");
    setIsRoleChosen(true);
  };

  // Handle the destination (Moodle or SMIS)
  const handleLMSRedirect = () => {
    localStorage.setItem("destination", "lms");
    if (role === "student") {
      navigate("/student/sign-in");
    } else if (role === "professor") {
      navigate("/professor/sign-in");
    }
  };
  
  const handleSMISRedirect = () => {
    localStorage.setItem("destination", "smis");
    if (role === "student") {
      navigate("/student/sign-in");
    } else if (role === "professor") {
      navigate("/professor/sign-in");
    }
  };
  

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.formContainer}>
          <Typography component="h1" variant="h5" className={classes.title}>
            {isRoleChosen
              ? "Where would you like to go?"
              : "Sign In"}
          </Typography>

          {!isRoleChosen ? (
            <>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleStudentSignIn}
              >
                As a Student
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleProfessorSignIn}
              >
                As a Professor
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleLMSRedirect}
              >
                Go to LMS
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleSMISRedirect}
              >
                Go to SMIS
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
