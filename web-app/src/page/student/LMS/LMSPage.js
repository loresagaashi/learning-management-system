import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  CssBaseline,
  CircularProgress,
  Avatar,
  Button,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser"; // if you have user context

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    padding: theme.spacing(4),
    background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
    fontSize: "32px",
    color: "#333",
    textAlign: "center",
  },
  card: {
    borderRadius: "16px",
    background: "linear-gradient(145deg, #dbeeff, #f0faff)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    paddingTop: 0,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
  icon: {
    backgroundColor: "#007bff",
  },
  appBar: {
    backgroundColor: "#007bff",
    marginBottom: theme.spacing(4),
  },
  logoutButton: {
    marginLeft: "auto",
    color: "#fff",
  },
  smisButton: {
    marginTop: theme.spacing(4),
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#005bb5",
    },
  },
}));

const LMSPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setUser } = useUser(); // if using context
  const [orientations, setOrientations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orientations")
      .then((res) => {
        console.log("API Response:", res.data); // Check the structure
        setOrientations(res.data.orientations); // Correct the path if needed
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orientations", err);
        setLoading(false);
      });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser?.(null); // clear context if available
    navigate("/choice/sign-in");
  };

  const goToSMIS = () => {
    navigate("/smis"); // Redirect to SMIS page
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
        <Container maxWidth="md">
          <Typography className={classes.title}>
            Welcome to the LMS Portal
          </Typography>

          {loading ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              {orientations.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No orientations available.
                </Typography>
              ) : (
                orientations.map((orientation) => (
                  <Grid item xs={12} sm={6} md={4} key={orientation.id}>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar className={classes.icon}>
                            <SchoolIcon />
                          </Avatar>
                        }
                        title={orientation.name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="body2" color="textSecondary">
                          This orientation includes{" "}
                          {orientation.courses?.length || 0} course(s).
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          {/* Button to go to SMIS */}
          <Button
            variant="contained"
            className={classes.smisButton}
            onClick={goToSMIS}
          >
            Go to SMIS
          </Button>
        </Container>
      </div>
    </>
  );
};

export default LMSPage;
