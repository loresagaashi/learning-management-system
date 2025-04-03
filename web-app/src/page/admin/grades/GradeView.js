import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { GradeService } from "../../../service/GradeService";
import { AssignmentService } from "../../../service/AssignmentService";
import { StudentService } from "../../../service/StudentService";

const gradeService = new GradeService();
const assignmentService = new AssignmentService();
const studentService = new StudentService();

export default function GradeView({}) {
  const errorRef = useRef();

  const { data: allAssignments } = useQuery(QueryKeys.ASSIGNMENT, () =>
    assignmentService.findAll()
  );

  const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
    studentService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Assignment",
      field: "assignment",
      render: (rowData) => rowData.assignment?.title,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allAssignments?.map((x) => ({ value: x, label: x.title })) || [],
          "id"
        ),
    },
    {
      title: "Student",
      field: "student",
      render: (rowData) => rowData.student ? `${rowData.student.firstName} ${rowData.student.lastName}` : '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allStudents?.map((x) => ({ value: x, label: `${x.firstName} ${x.lastName}` })) || [],
          "id",
        ),
    },
    {
      title: "Grade",
      field: "grade",
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
      title="Manage Grades"
      columns={columns}
      service={gradeService}
      queryKey={QueryKeys.GRADE}
      errorRef={errorRef}
    />
  );
}
