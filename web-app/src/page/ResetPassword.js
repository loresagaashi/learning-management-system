import React, { useState, useEffect } from "react";
import { Container, Typography, Button, CssBaseline } from "@material-ui/core";
import ValidTextField from "../component/common/ValidTextField";
import { makeStyles } from "@material-ui/core/styles";
import { UserService } from "../service/UserService";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

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
  codeInputWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  codeInput: {
    width: "45px",
    height: "45px",
    textAlign: "center",
    borderBottom: "2px solid #000",
    fontSize: "24px",
  },
}));

const userService = new UserService();

const ResetPassword = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: Array(6).fill(""),
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (emailFromState) {
      setFormData((prev) => ({ ...prev, email: emailFromState }));
    }
  }, [emailFromState]);

  const { mutate, isLoading, error } = useMutation(
    (updatedFormData) => userService.resetPassword(updatedFormData),
    {
      onSuccess: () => {
        setMessage("Password has been successfully reset!");
        setTimeout(() => navigate("/choice/sign-in"), 2000);
      },
      onError: () => {
        setMessage("Failed to reset password. Please check your inputs.");
      },
    }
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...formData.verificationCode];
      newCode[index] = value;
      setFormData((prev) => ({ ...prev, verificationCode: newCode }));
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = () => {
    setMessage("");
    const fullCode = formData.verificationCode.join("");
    if (fullCode.length !== 6 || formData.verificationCode.includes("")) {
      setMessage("Please enter the full 6-digit verification code.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    mutate({ ...formData, verificationCode: fullCode });
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.formContainer}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Typography variant="body1" style={{ marginTop: "16px" }}>
            Verification Code
          </Typography>
          <div className={classes.codeInputWrapper}>
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={formData.verificationCode[index] || ""}
                onChange={(e) => handleCodeChange(e, index)}
                className={classes.codeInput}
                maxLength="1"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <ValidTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            disabled
          />
          <ValidTextField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <ValidTextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {message && (
            <Typography
              variant="body2"
              style={{ marginTop: "10px", color: error ? "red" : "black" }}
            >
              {message}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Reset Password
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
