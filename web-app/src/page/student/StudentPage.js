import React from "react";
import { Button, Container, CssBaseline, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
  },
  content: {
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
    marginBottom: theme.spacing(2),
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
}));

export default function StudentPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogOut = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/choice/sign-in");
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.content}>
          <Typography className={classes.title}>Welcome, Student!</Typography>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </div>
      </Container>
    </div>
  );
}
