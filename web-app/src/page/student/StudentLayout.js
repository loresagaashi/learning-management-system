import { AppBar, Badge, Button, CssBaseline, Divider, Drawer, IconButton, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatComponent from "../../component/ChatComponent";
import AppMenu from "../../component/studentSMIS/AppMenu";
import useUser from "../../hooks/useUser";
import SemesterRegistration from "./SMIS/SemesterRegistration";
import StudentExam from "./SMIS/StudentExams";
import StudentGrades from "./SMIS/StudentGrades";
import StudentProfile from "./SMIS/StudentProfile";
//import StudentScheduleView from "./SMIS/StudentScheduleView";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import StudentExamRegistration from '../admin/exams/StudentExamRegistration';
import GroupRegister from "./SMIS/GroupRegister";
import StudentSchedulePage from './SMIS/StudentSchedulePage';
import CourseDetail from './LMS/components/CourseDetail';

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

export default function StudentLayout({}) {
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

  const locationPath = location.pathname.split("/student/")[1];

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
        {user?.user?.type === 'Student' &&
          <Routes>
            <Route path="/profile" element={<StudentProfile/>}/>
            <Route path="/grades" element={<StudentGrades/>}/>
            <Route path="/exams" element={<StudentExam/>}/>
            <Route path="/chat" element={<ChatComponent/>}/>
            <Route path="/semester" element={<SemesterRegistration/>}/>
            <Route path="/assign-to-group" element={<GroupRegister/>}/>
            <Route path="/registred-exam" element={<StudentExamRegistration/>}/>
            <Route path="/schedules" element={<StudentSchedulePage/>}/>
            <Route path="/course/:courseId" element={<CourseDetail/>}/>

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