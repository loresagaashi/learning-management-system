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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useUser from "../../hooks/useUser";
import AppMenuItem from "../dashboard/AppMenuItem";
import SchoolIcon from '@material-ui/icons/School';
import TextsmsIcon from '@material-ui/icons/Textsms';

const appMenuItems = [
  {
    name: "GO TO LMS",
    Icon: SchoolIcon,
    link: "/professor/lms",
  },
  {
    name: "My Profile", 
    Icon: PersonIcon, 
    link: "/professor/profile", 
  },
  {
    name: "My Courses",
    Icon: SchoolIcon,
    link: "/professor/courses",
  },
  {
    name: "Attendance",
    Icon: SchoolIcon,
    link: "/professor/attendance",
  },
  {
    name: "Vendos Notat",
    Icon: SchoolIcon,
    link: "/professor/passed-exam",
  },
  // {
  //   name: "Chat",
  //   Icon: TextsmsIcon,
  //   link: "/professor/chat",
  // },
 
];


export default function AppMenu({}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleLogOut() {
    setUser(null)
    localStorage.removeItem('user')
    navigate("/choice/sign-in", { replace: true });
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
