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
// import { StudentService } from "../../../service/StudentService";

const gradeService = new GradeService();
const assignmentService = new AssignmentService();
// const studentService = new StudentService();

export default function GradeView({}) {
  const errorRef = useRef();

  const { data: allAssignments } = useQuery(QueryKeys.ASSIGNMENT, () =>
    assignmentService.findAll()
  );

//   const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
//     studentService.findAll()
//   );

  const columns = [
    {
      title: "Id",
      field: "id",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
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
   //  {
   //    title: "Student",
   //    field: "student",
   //    render: (rowData) => rowData.student?.fullName,
   //    editComponent: (props) =>
   //      SelectTableCell(
   //        props,
   //        errorRef,
   //        allStudents?.map((x) => ({ value: x, label: x.fullName })) || [],
   //        "id"
   //      ),
   //  },
    {
      title: "Grade",
      field: "grade",
      type: "numeric",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
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
