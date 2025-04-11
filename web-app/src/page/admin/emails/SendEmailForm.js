import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import { EmailService } from '../../../service/EmailService';
import { StudentService } from '../../../service/StudentService';
import { ProfessorService } from '../../../service/ProfessorService';
import { QueryKeys } from '../../../service/QueryKeys';
import { Autocomplete } from '@material-ui/lab';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: '8px',
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  input: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    width: '100%',
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },
}));

const studentService = new StudentService();
const professorService = new ProfessorService();
const emailService = new EmailService();

const SendEmailForm = () => {
  const classes = useStyles();

  const { data: allStudents = [] } = useQuery(QueryKeys.STUDENTS, () => studentService.findAll());
  const { data: allProfessors = [] } = useQuery(QueryKeys.PROFESSOR, () => professorService.findAll());
  const allRecipients = [...allStudents, ...allProfessors];
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailSelect = (event, selectedUser) => {
    setSelectedUser(selectedUser);
    setFormData((prevData) => ({
      ...prevData,
      to: selectedUser ? selectedUser.email : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailService.create(formData);
      setSnackbar({
        open: true,
        message: 'Email sent successfully!',
        severity: 'success',
      });
      setFormData({ to: '', subject: '', body: '' });
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Failed to send email.',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Send Email
        </Typography>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={allRecipients}
            value={selectedUser} // Bind value to the selected user state
            getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.email})`}
            onChange={handleEmailSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                variant="outlined"
                required
                className={classes.input}
              />
            )}
          />

          <TextField
            label="Subject"
            name="subject"
            variant="outlined"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className={classes.input}
          />

          <TextField
            label="Body"
            name="body"
            variant="outlined"
            multiline
            rows={5}
            value={formData.body}
            onChange={handleInputChange}
            required
            className={classes.input}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Send Email
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SendEmailForm;
