import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BallotIcon from '@material-ui/icons/Ballot';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GradeIcon from '@material-ui/icons/Grade';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import SchoolIcon from '@material-ui/icons/School';
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useUser from "../../hooks/useUser";
import AppMenuItem from "../dashboard/AppMenuItem";

const appMenuItems = [
   {
      name: "GO TO LMS",
      Icon: SchoolIcon,
      link: "/student/lms",
    },
    {
      name: "My Profile",
      Icon: AccountCircleIcon,
      link: "/student/profile",
    },
    {
      name: "Provimet e paraqitura",
      Icon: BallotIcon,
      link: "/student/exams",
    },
    {
      name: "Transkripta",
      Icon: GradeIcon,
      link: "/student/grades",
    },
    // {
    //   name: "Chat",
    //   Icon: TextsmsIcon,
    //   link: "/student/chat",
    // },
    {
      name: "Choose Semester",
      Icon: QueryBuilderIcon,
      link: "/student/semester",
    },
    {
      name: "Choose Group",
      Icon: PeopleOutlineIcon,
      link: "/student/assign-to-group",
    },
    {
      name: "Schedule",
      Icon: QueryBuilderIcon,
      link: "/student/schedules",
    },
    {
      name: "Paraqit Provimet",
      Icon: PeopleOutlineIcon,
      link: "/student/registred-exam",
    },
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
