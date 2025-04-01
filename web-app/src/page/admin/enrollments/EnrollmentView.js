import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { EnrollmentService } from "../../../service/EnrollmentService";
import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";
import { useQuery } from "react-query";

const enrollmentService = new EnrollmentService();
const studentService = new StudentService();
const courseService = new CourseService();

export default function EnrollmentView({}) {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
    studentService.findAll()
  );
  
  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
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
      title: "Enrollment Date",
      field: "enrollmentDate",
      type: "date",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Status",
      field: "status",
      editComponent: (props) =>
        SelectTableCell(props, errorRef, [
          { value: "PENDING", label: "Pending" },
          { value: "APPROVED", label: "Approved" },
          { value: "REJECTED", label: "Rejected" },
        ]),
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
