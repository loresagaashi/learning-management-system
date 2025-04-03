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
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DescriptionIcon from '@material-ui/icons/Description';
import ListAltIcon from "@material-ui/icons/ListAlt";
import PaymentIcon from '@material-ui/icons/Payment';
import ExploreIcon from "@material-ui/icons/Explore"; 
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import StarIcon from "@material-ui/icons/Star";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const appMenuItems = [
  {
    name: "Dashboard",
    Icon: DashboardIcon,
    link: "/admin/dashboard",
  },
  {
    name: "Admins",
    Icon: PersonIcon,
    link: "/admin/admins",
  },
  {
    name:"Students",
    Icon: PersonIcon,
    link: "/admin/students",
  },
  {
    name:"Professors",
    Icon: PersonIcon,
    link: "/admin/professor",
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
  {
    name: "Reports",
    Icon: DescriptionIcon,
    link: "/admin/report",
  },
  {
    name: "Logs",
    Icon: ListAltIcon,
    link: "/admin/log",
  },
  {
    name: "Payments",
    Icon: PaymentIcon,
    link: "/admin/payments",
  },
  {
    name: "Orientations",
    Icon: MenuBookIcon,
    link: "/admin/orientations",
  },
  {
    name: "Schedules",
    Icon: EventAvailableIcon,
    link: "/admin/schedules",
  },
  {
    name: "Enrollments",
    Icon: HowToRegIcon,
    link: "/admin/enrollment",
  },
  {
    name: "Feedbacks",
    Icon: StarIcon,
    link: "/admin/feedbacks",
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
