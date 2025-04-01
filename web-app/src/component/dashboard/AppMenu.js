import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AppMenuItem from "./AppMenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useUser from "../../hooks/useUser";
import SchoolIcon from '@material-ui/icons/School';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckIcon from '@material-ui/icons/Check';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const appMenuItems = [
  {
    name: "Dashboard",
    Icon: DashboardIcon,
    link: "/admin/dashboard",
  },
  {
    name:" Students ",
    Icon: PersonIcon,
    link: "/admin/students",
  },
  {
    name: "Courses",
    Icon: SchoolIcon,
    link: "/admin/courses",
  },
  {
    name: "Materials",
    Icon: LibraryBooksIcon,
    link: "/admin/materials",
  },
  {
    name: "Lectures",
    Icon: EventIcon,
    link: "/admin/lectures",
  },
  {
    name: "Assignments",
    Icon: AssignmentIcon,
    link: "/admin/assignment",
  },
  {
    name: "Submissions",
    Icon: AssignmentTurnedInIcon,
    link: "/admin/submission",
  },
  {
    name: "Grades",
    Icon: InsertDriveFileIcon,
    link: "/admin/grade",
  },
];


export default function AppMenu({}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleLogOut() {
    setUser(null)
    localStorage.removeItem('user')
    navigate("/admin/sign-in", { replace: true });
  }

  return (
    <SimpleBar
      style={{
        height: `calc(100% - ${theme.toolbarHeight}px)`,
        overflowX: "hidden",
      }}
    >
      <List component="nav">
        {appMenuItems.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
        <ListItem key={-1} onClick={handleLogOut} button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
    </SimpleBar>
  );
}
