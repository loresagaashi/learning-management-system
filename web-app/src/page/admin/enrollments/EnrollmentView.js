import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  EnumSelectTableCell,
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { EnrollmentService } from "../../../service/EnrollmentService";
import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";
import { useQuery } from "react-query";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const enrollmentService = new EnrollmentService();
const studentService = new StudentService();
const courseService = new CourseService();

export default function EnrollmentView({}) {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENTS, () =>
    studentService.findAll()
  );

  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
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
      title: "Enrollment Date",
      field: "enrollmentDate",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={props.value || null}
            onChange={(date) => props.onChange(date)}
            format="yyyy-MM-dd"
            inputVariant="outlined"
            fullWidth
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "Enrollment Status",
      field: "status",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "ACTIVE", label: "Active" },
          { value: "COMPLETED", label: "Completed" },
          { value: "DROPPED", label: "Dropped" },
        ]),
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
      title="Manage Enrollments"
      columns={columns}
      service={enrollmentService}
      queryKey={QueryKeys.ENROLLMENT}
      errorRef={errorRef}
    />
  );
}
