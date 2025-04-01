import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { ScheduleService } from "../../../service/ScheduleService";
import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";
import { ProfessorService } from "../../../service/ProfessorService";
import { useQuery } from "react-query";

const scheduleService = new ScheduleService();
const studentService = new StudentService();
const courseService = new CourseService();
const professorService = new ProfessorService();

export default function ScheduleView({}) {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
    studentService.findAll()
  );

  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );
  
  const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
    professorService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Student",
      field: "student",
      render: (rowData) => rowData.student?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allStudents?.map((x) => ({ value: x, label: x.name })) || [],
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
      title: "Day of Week",
      field: "dayOfWeek",
      editComponent: (props) =>
        SelectTableCell(props, errorRef, [
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
      title: "Start Time",
      field: "startTime",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "End Time",
      field: "endTime",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Room",
      field: "room",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Professor",
      field: "professor",
      render: (rowData) => rowData.professor?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allProfessors?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
        ),
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
