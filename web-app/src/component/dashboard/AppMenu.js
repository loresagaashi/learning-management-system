import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRangeIcon from '@material-ui/icons/DateRange';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupIcon from '@material-ui/icons/Group';
import HowToRegIcon from "@material-ui/icons/HowToReg";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from "@material-ui/icons/ListAlt";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PaymentIcon from '@material-ui/icons/Payment';
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import SchoolIcon from '@material-ui/icons/School';
import StarIcon from "@material-ui/icons/Star";
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useUser from "../../hooks/useUser";
import AppMenuItem from "./AppMenuItem";

const appMenuItems = [
  {
    name: "Dashboard",
    Icon: DashboardIcon,
    link: "/admin/dashboard",
  },
  {
    name: "Admins",
    Icon: PersonOutlineIcon,
    link: "/admin/admins",
  },
  {
    name:"Students",
    Icon: PersonIcon,
    link: "/admin/students",
  },
  {
    name:"Professors",
    Icon: AccountBoxIcon,
    link: "/admin/professors",
  },
  // {
  //   name: "Chat",
  //   Icon: TextsmsIcon,
  //   link: "/admin/chat",
  // },
  {
    name:"Send Emails",
    Icon: EmailIcon,
    link: "/admin/emails/sendEmail",
  },
  {
    name: "Courses",
    Icon: SchoolIcon,
    link: "/admin/courses",
  },
  {
    name: "Groups",
    Icon: GroupIcon,
    link: "/admin/student-groups",
  },
  {
    name: "Generations",
    Icon: DateRangeIcon,
    link: "/admin/generations",
  },
  {
    name: "Add Schedules",
    Icon: QueryBuilderIcon,
    link: "/admin/schedules",
  },
  {
    name: "View Schedule",
    Icon: LocationCityIcon,
    link: "/admin/view-schedule",
  },  
  {
    name: "Semesters",
    Icon: MenuBookIcon,
    link: "/admin/semester",
  },
  {
    name: "Exams",
    Icon: LibraryBooksIcon,
    link: "/admin/exams",
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
    link: "/admin/assignments",
  },
  {
    name: "Submissions",
    Icon: AssignmentTurnedInIcon,
    link: "/admin/submissions",
  },
  // {
  //   name: "Grades",
  //   Icon: InsertDriveFileIcon,
  //   link: "/admin/grades",
  // },
  {
    name: "Reports",
    Icon: DescriptionIcon,
    link: "/admin/reports",
  },
  {
    name: "Logs",
    Icon: ListAltIcon,
    link: "/admin/logs",
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
    name: "Enrollments",
    Icon: HowToRegIcon,
    link: "/admin/enrollments",
  },
  {
    name: "Feedbacks",
    Icon: StarIcon,
    link: "/admin/feedbacks",
  },
  {
    name: "Cities",
    Icon: LocationCityIcon,
    link: "/admin/cities",
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
