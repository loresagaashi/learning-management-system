import React, { useState } from "react";
import { Container, Typography, CssBaseline, makeStyles } from "@material-ui/core";
import ValidTextField from "../component/common/ValidTextField";
import { UserService } from "../service/UserService";
import LoadingButton from "../component/LoadingButton";
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
      "linear-gradient(130deg, rgb(199, 222, 241) 20%,rgb(217, 236, 251) 50%, rgb(199, 222, 241) 80%)",
  },
  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
}));

const userService = new UserService();

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      await userService.forgotPassword(email);
      navigate("/reset-password", { state: { email } });
   } catch (error) {
      setMessage({ type: "error", text: "Failed to send verification code." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.formContainer}>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Typography variant="body2" style={{ marginBottom: 16 }}>
            Enter your email to receive a password reset code.
          </Typography>
          <ValidTextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <LoadingButton
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSendCode}
            loading={isLoading}
          >
            Send Reset Code
          </LoadingButton>

          {message && (
            <Typography
              style={{
                marginTop: "15px",
                color: message.type === "success" ? "green" : "red",
              }}
            >
              {message.text}
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
}
