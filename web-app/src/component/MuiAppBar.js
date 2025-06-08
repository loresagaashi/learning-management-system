import React from "react";
import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
// import useDarkMode from "../hooks/useDarkMode";
import DarkModeIcon from "@material-ui/icons/Brightness4";
import LightModeIcon from "@material-ui/icons/Brightness7";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    background: theme.palette.primary.main,
    color: "BLACK",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    fontFamily: "monospace",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    margin: theme.spacing(1),
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },
  link: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1, 1.5),
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

export default function MuiAppBar() {
  const classes = useStyles();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  // const toggleDarkMode = useDarkMode();
  const theme = useTheme();

  function handleLogOut() {
    console.log("Logging out...");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/client/home");
  }

  return (
    <>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <IconButton color="inherit">
          {theme.palette.type === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          className={classes.toolbarTitle}
          component={RouterLink}
          to={"/client/home"}
        >
          University Management System
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <Link
            variant="button"
            to="/client/home"
            component={RouterLink}
            className={classes.link}
          >
            Home
          </Link>
          {user && (
            <nav>
              <Link
                variant="button"
                to="/client/profile"
                component={RouterLink}
                className={classes.link}
              >
                Profile
              </Link>
            </nav>
          )}
          {user ? (
            <Button
              color="primary"
              variant="contained"
              className={classes.link}
              onClick={handleLogOut}
            >
              Log out
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              className={classes.link}
              component={RouterLink}
              to="/client/sign-in"
            >
              Sign In
            </Button>
          )}
        </Box>
      </AppBar>
    </>
  );
}
