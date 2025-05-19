import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { LogService } from "../../../service/LogService";
import { StudentService } from "../../../service/StudentService";
import { ProfessorService } from "../../../service/ProfessorService";

const logService = new LogService();
const studentService = new StudentService();
const professorService = new ProfessorService();

export default function LogView() {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENTS, () =>
    studentService.findAll()
  );
  const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
    professorService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Message",
      field: "message",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Student",
      field: "studentId",
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
      title: "Professor",
      field: "professorId",
      render: (rowData) => rowData.professor ? `${rowData.professor.firstName} ${rowData.professor.lastName}` : '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allProfessors?.map((x) => ({ value: x, label: `${x.firstName} ${x.lastName}` })) || [],
          "professorId",
        ),
    },
   
  ];

  const handleSave = async (log) => {
    await logService.saveLogWithStudentAndProfessor(log);
  };

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
