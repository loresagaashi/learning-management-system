import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { LogService } from "../../../service/LogService";
// import { StudentService } from "../../../service/StudentService";
// import { ProfessorService } from "../../../service/ProfessorService";

const logService = new LogService();
// const studentService = new StudentService();
// const professorService = new ProfessorService();

export default function LogView() {
  const errorRef = useRef();

//   const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
//     studentService.findAll()
//   );
//   const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
//     professorService.findAll()
//   );

  const columns = [
    {
      title: "Id",
      field: "id",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Message",
      field: "message",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Student",
      // field: "student",
      // render: (rowData) => rowData.student?.fullName || "N/A",
      // editComponent: (props) =>
      //   SelectTableCell(
      //     props,
      //     errorRef,
      //     allStudents?.map((x) => ({ value: x, label: x.fullName })) || [],
      //     "id"
      //   ),
    },
    {
      title: "Professor",
      // field: "professor",
      // render: (rowData) => rowData.professor?.fullName || "N/A",
      // editComponent: (props) =>
      //   SelectTableCell(
      //     props,
      //     errorRef,
      //     allProfessors?.map((x) => ({ value: x, label: x.fullName })) || [],
      //     "id"
      //   ),
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Logs"
      columns={columns}
      service={logService}
      queryKey={QueryKeys.LOG}
      errorRef={errorRef}
    />
  );
}
