import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 400,
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  averageText: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  emptyText: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(4),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(6),
  },
}));

const StudentGrades = () => {
  const classes = useStyles();
  const [examGrades, setExamGrades] = useState([]);
  const [averageGrade, setAverageGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const userId = user?.user?.id;

  useEffect(() => {
    if (!userId) return;

    
axios
  .get(`http://localhost:8080/exam-applications/passed/${userId}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data.passedExams)) {
          setExamGrades(data.passedExams);
          setAverageGrade(data.averageGrade);
        } else {
          console.error("Expected passedExams to be an array, got:", data.passedExams);
          setExamGrades([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching exam grades:", error);
        setExamGrades([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Exam Grades
      </Typography>

      {averageGrade !== null && (
        <Typography variant="h6" className={classes.averageText}>
          Average Grade: {averageGrade}
        </Typography>
      )}

      {examGrades.length === 0 ? (
        <Typography variant="body1" className={classes.emptyText}>
          No exams attended yet.
        </Typography>
      ) : (
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examGrades.map((examGrade, index) => (
                  <TableRow key={index}>
                    <TableCell>{examGrade.courseName}</TableCell>
                    <TableCell>{examGrade.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default StudentGrades;
