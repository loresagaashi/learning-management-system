import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import TimePickers, {
  EnumSelectTableCell,
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { ScheduleService } from "../../../service/ScheduleService";
import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";
import { ProfessorService } from "../../../service/ProfessorService";
import { StudentGroupService } from "../../../service/StudentGroupService";
import { useQuery } from "react-query";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { SemesterService } from "../../../service/SemesterService";

const scheduleService = new ScheduleService();
const studentService = new StudentService();
const courseService = new CourseService();
const professorService = new ProfessorService();
const studentGroupService = new StudentGroupService();
const semesterService = new SemesterService();

export default function ScheduleView({}) {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENTS, () =>
    studentService.findAll()
  );

  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );

  const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
    professorService.findAll()
  );

  const { data: allGroups } = useQuery(QueryKeys.STUDENT_GROUPS, () =>
    studentGroupService.findAll()
  );
  const { data: allSemesters } = useQuery(QueryKeys.SEMESTER, () =>
    semesterService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Student",
      field: "student",
      render: (rowData) =>
        rowData.student
          ? `${rowData.student.firstName} ${rowData.student.lastName}`
          : "",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allStudents?.map((x) => ({
            value: x,
            label: `${x.firstName} ${x.lastName}`,
          })) || [],
          "id"
        ),
    },
    {
      title: "Course",
      field: "course",
      render: (rowData) => rowData.course?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCourses?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
        ),
    },
    {
      title: "Semester",
      field: "semester",
      render: (rowData) => rowData.semester?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allSemesters?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
        ),
    },
    {
      title: "Professor",
      field: "professor",
      render: (rowData) =>
        rowData.professor
          ? `${rowData.professor.firstName} ${rowData.professor.lastName}`
          : "",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allProfessors?.map((x) => ({
            value: x,
            label: `${x.firstName} ${x.lastName}`,
          })) || [],
          "id"
        ),
    },

    {
      title: "Group",
      field: "studentGroup",
      render: (rowData) => rowData.studentGroup?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allGroups?.map((g) => ({ value: g, label: g.name })) || [],
          "id"
        ),
    },

    {
      title: "Day of Week",
      field: "dayOfWeek",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "MONDAY", label: "Monday" },
          { value: "TUESDAY", label: "Tuesday" },
          { value: "WEDNESDAY", label: "Wednesday" },
          { value: "THURSDAY", label: "Thursday" },
          { value: "FRIDAY", label: "Friday" },
          { value: "SATURDAY", label: "Saturday" },
          { value: "SUNDAY", label: "Sunday" },
        ]),
    },
    {
      title: "Start time",
      field: "startTime",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePickers {...props} errorRef={errorRef} />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "End time",
      field: "endTime",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePickers {...props} errorRef={errorRef} />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "Room",
      field: "room",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Created On",
      field: "createdOn",
      type: "date",
      editable: "never",
    },
    {
      title: "Updated On",
      field: "updatedOn",
      type: "date",
      editable: "never",
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Schedules"
      columns={columns}
      service={scheduleService}
      queryKey={QueryKeys.SCHEDULE}
      errorRef={errorRef}
    />
  );
}
