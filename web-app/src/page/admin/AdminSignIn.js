import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import ValidTextField from "../../component/common/ValidTextField";
import { UserService } from "../../service/UserService";
import useUser from "../../hooks/useUser";
import { QueryKeys } from "../../service/QueryKeys";
import LoadingButton from "../../component/LoadingButton";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const userService = new UserService();

export default function AdminSignIn({ onSuccess, hideSignUpLink, isLoading }) {
  const classes = useStyles();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);

  // useMutation when we need to use it for example when clicking a button
  const {
    mutate,
    isLoading: signInLoading,
    error,
  } = useMutation(
    QueryKeys.USER_BY_EMAIL(userAccount.email),
    (user) => userService.adminLogIn(user),
    {
      onSuccess: (data) => {
        if(data?.user?.type === 'Admin') {
          setUser(data);
          !!onSuccess ? onSuccess(data) : navigate("/admin/dashboard");
        } else {
          setErrorMessage(true);
        }
      },
    },
  );

  function handleLogin() {
    mutate(userAccount);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  const handleSnackbarClose = () => {
    setErrorMessage(false);
  };

  if(user) {
    navigate('/admin/dashboard',  { replace: true })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidTextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={userAccount.email}
          onChange={(e) =>
            setUserAccount((prev) => ({ ...prev, email: e.target.value }))
          }
          autoComplete="email"
          autoFocus
          error={error}
        />
        <ValidTextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={userAccount.password}
          onChange={(e) =>
            setUserAccount((prev) => ({ ...prev, password: e.target.value }))
          }
          onKeyDown={handleKeyPress}
          autoComplete="current-password"
          error={error}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
          loading={isLoading || signInLoading}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          {!hideSignUpLink && (
            <Grid item>
              <Link
                href="#"
                variant="body2"
                to="/sign-up"
                component={RouterLink}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          )}
        </Grid>
      </div>
      <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
          Admin role is required to login!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}