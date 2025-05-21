import { useState } from "react";
import { useTheme, makeStyles, Button, AppBar, Badge, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatComponent from "../../component/ChatComponent";
import AppMenu from "../../component/dashboard/AppMenu";
import useUser from "../../hooks/useUser";
import AdminView from "./admins/AdminView";
import AssignmentView from "./assignments/AssignmentView";
import CityView from "./cities/CityView";
import CoursesView from "./courses/CoursesView";
import AdminDashboard from "./dashboard/AdminDashboard";
import SendEmailForm from "./emails/SendEmailForm";
import EnrollmentView from "./enrollments/EnrollmentView";
import FeedbackView from "./feedbacks/FeedbackView";
import GradeView from "./grades/GradeView";
import LecturesView from "./lectures/LecturesView";
import LogView from "./logs/LogView";
import MaterialsView from "./materials/MaterialsView";
import OrientationView from "./orientations/OrientationView";
import PaymentView from "./payments/PaymentView";
import ProfessorView from "./professors/ProfessorView";
import ReportView from "./reports/ReportView";
import ScheduleView from "./schedules/ScheduleView";
import StudentView from "./students/StudentView";
import SubmissionView from "./submissions/SubmissionView";
import StudentGroups from "./groups/StudentGroups";
import GenerationView from "./generations/GenerationView";
import SemesterView from "./semesters/SemesterView";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";

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
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    zIndex: 1000,
    "&:hover": {
      backgroundColor: "#005bb5",
    },
  },
  chatOverlay: {
    position: "fixed",
    bottom: 80,
    right: 20,
    width: 400,
    maxHeight: "70vh",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 1500,
    overflow: "auto",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
}));

export default function AdminLayout({}) {
  const classes = useStyles();
  const [ open, setOpen ] = React.useState(true);
  const location = useLocation();
  const { user } = useUser();
  const theme = useTheme();
  const [chatOpen, setChatOpen] = useState(false);
  
  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

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
            <Route path="/chat" element={<ChatComponent/>}/>
            <Route path="/student-groups" element={<StudentGroups/>}/>
            <Route path="/generations" element={<GenerationView/>}/>
            <Route path="/semester" element={<SemesterView/>}/>

          </Routes>
        }
        {!chatOpen && (
            <Button
              variant="contained"
              className={classes.chatButton}
              startIcon={<ChatIcon />}
              onClick={toggleChat}
            >
              Chat
            </Button>
          )}

          {chatOpen && (
            <div className={classes.chatOverlay}>
              <div className={classes.chatHeader}>
                <Typography variant="subtitle1">Chat</Typography>
                <div>
                  <IconButton size="small" onClick={() => setChatOpen(false)}>
                    <CloseIcon style={{ color: "white" }} />
                  </IconButton>
                </div>
              </div>
              <ChatComponent onClose={() => setChatOpen(false)} />
            </div>
          )}
      </main>
    </div>
  );
}