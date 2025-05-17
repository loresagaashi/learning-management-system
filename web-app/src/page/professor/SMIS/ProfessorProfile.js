import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Paper,
  Avatar,
  Typography,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import useUser from '../../../hooks/useUser';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  card: {
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '1000px',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  avatarSection: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    padding: theme.spacing(4),
  },
  userImage: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    marginBottom: theme.spacing(3),
  },
  userDetails: {
    padding: theme.spacing(4),
  },
  userInfo: {
    marginBottom: theme.spacing(3),
  },
  coursesSection: {
    marginTop: theme.spacing(4),
  },
}));

const ProfessorProfile = () => {
  const classes = useStyles();
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const renderUserInfo = () => (
    <Grid container spacing={3} className={classes.userInfo}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Email</Typography>
        <TextField
          fullWidth
          value={user?.user.email}
          variant="outlined"
          margin="dense"
          disabled
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2">Phone</Typography>
        <TextField
          fullWidth
          value={user?.user.phoneNumber}
          variant="outlined"
          margin="dense"
          disabled
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2">Department</Typography>
        <TextField
          fullWidth
          value={user?.user.department}
          variant="outlined"
          margin="dense"
          disabled
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2">Status</Typography>
        <TextField
          fullWidth
          value={user?.user.status}
          variant="outlined"
          margin="dense"
          disabled
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2">Birth Date</Typography>
        <TextField
          fullWidth
          value={user?.user.birthDate}
          variant="outlined"
          margin="dense"
          disabled
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2">Gender</Typography>
        <TextField
          fullWidth
          value={user?.user.gender}
          variant="outlined"
          margin="dense"
          disabled
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>
    </Grid>
  );

  const renderCourses = () => (
    <div className={classes.coursesSection}>
      <Typography variant="h6"><b>Courses</b></Typography>
      {loadingCourses ? (
        <CircularProgress />
      ) : courses.length > 0 ? (
        <List>
          {courses.map((course) => (
            <ListItem key={course.id}>
              <ListItemText
                primary={course.name}
                secondary={course.description}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No courses assigned.</Typography>
      )}
    </div>
  );

  useEffect(() => {
    if (!user?.user.id) {
      console.error("No professor ID found in user context.");
      return;
    }

    // Fetch the courses for the professor
    axios.get(`/professors/${user?.user.id}/courses`)
      .then((response) => {
        setCourses(response.data);
        setLoadingCourses(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoadingCourses(false);
      });
  }, [user]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <section className={classes.profileContainer}>
        <Paper elevation={3} className={classes.card}>
          <Grid container>
            <Grid item xs={12} md={4} className={classes.avatarSection}>
              <Avatar src="/user/professor.jpg" alt="Professor" className={classes.userImage} />
              <Typography variant="h6">
                {user?.user.firstName} {user?.user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} className={classes.userDetails}>
              <Typography variant="h5"><b>My Profile</b></Typography>
              <hr />
              {renderUserInfo()}
              {renderCourses()}
            </Grid>
          </Grid>
        </Paper>
      </section>
    </MuiPickersUtilsProvider>
  );
};

export default ProfessorProfile;