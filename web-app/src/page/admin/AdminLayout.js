import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import AppMenu from "../../component/dashboard/AppMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import {
  useTheme,
} from "@material-ui/core";
import AdminDashboard from "./dashboard/AdminDashboard";
import CoursesView from "./courses/CoursesView";
import MaterialsView from "./materials/MaterialsView";
import LecturesView from "./lectures/LecturesView";
import AssignmentView from "./assignments/AssignmentView";
import SubmissionView from "./submissions/SubmissionView";
import GradeView from "./grades/GradeView";
import ReportView from "./reports/ReportView";
import LogView from "./logs/LogView";
import PaymentView from "./payments/PaymentView";
import StudentView from "./students/StudentView";
import ProfessorView from "./professors/ProfessorView";
import OrientationView from "./orientations/OrientationView";
import ScheduleView from "./schedules/ScheduleView";
import EnrollmentView from "./enrollments/EnrollmentView";
import FeedbackView from "./feedbacks/FeedbackView";
import AdminView from "./admins/AdminView";
import CityView from "./cities/CityView";
import SendEmailForm from "./emails/SendEmailForm";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([ "width", "margin" ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([ "width", "margin" ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AdminLayout({}) {
  const classes = useStyles();
  const [ open, setOpen ] = React.useState(true);
  const location = useLocation();
  const { user } = useUser();
  const theme = useTheme();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const locationPath = location.pathname.split("/admin/")[1];

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {locationPath === 'orderDetails' ? 'Orders' : locationPath.charAt(0).toUpperCase() + locationPath.slice(1)}
          </Typography>
         
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <AppMenu/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        {user?.user?.type === 'Admin' &&
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admins" element={<AdminView/>}/>
            <Route path="/students" element={<StudentView/>}/>
            <Route path="/professors" element={<ProfessorView/>}/>
            <Route path="/courses" element={<CoursesView/>}/>
            <Route path="/materials" element={<MaterialsView/>}/>
            <Route path="/lectures" element={<LecturesView/>}/>
            <Route path="/assignments" element={<AssignmentView/>}/>
            <Route path="/submissions" element={<SubmissionView/>}/>
            <Route path="/grades" element={<GradeView/>}/>
            <Route path="/reports" element={<ReportView/>}/>
            <Route path="/logs" element={<LogView/>}/>
            <Route path="/payments" element={<PaymentView/>}/>
            <Route path="/orientations" element={<OrientationView/>}/>
            <Route path="/schedules" element={<ScheduleView/>}/>
            <Route path="/enrollments" element={<EnrollmentView/>}/>
            <Route path="/feedbacks" element={<FeedbackView/>}/>
            <Route path="/cities" element={<CityView/>}/>
            <Route path="/emails/sendEmail" element={<SendEmailForm/>}/>

          </Routes>
        }
      </main>
    </div>
  );
}