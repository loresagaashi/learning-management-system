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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuBookIcon from "@material-ui/icons/MenuBook";

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
      name: "Submit exams",
      Icon: LibraryBooksIcon,
      link: "/student/registred-exam",
    },
    {
      name: "Submitted exams",
      Icon: BallotIcon,
      link: "/student/exams",
    },
    // {
    //   name: "Chat",
    //   Icon: TextsmsIcon,
    //   link: "/student/chat",
    // },
    {
      name: "Choose Semester",
      Icon: MenuBookIcon,
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
      name: "Transkripta",
      Icon: GradeIcon,
      link: "/student/grades",
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
