import { useRef } from "react";
import { useQuery } from "react-query";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { GenerationService } from "../../../service/GenerationService";
import { QueryKeys } from "../../../service/QueryKeys";
import { SemesterService } from "../../../service/SemesterService";
import { StudentGroupService } from "../../../service/StudentGroupService";

const studentGroupService = new StudentGroupService();
const generationService = new GenerationService();
const semesterService = new SemesterService();

export default function StudentGroups() {
  const errorRef = useRef();

  const { data: allGenerations } = useQuery(QueryKeys.GENERATIONS, () =>
    generationService.findAll()
  );
  const { data: allSemesters } = useQuery(QueryKeys.SEMESTER, () =>
    semesterService.findAll()
  );

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: "never",
    },
    {
      title: "Group Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Capacity",
      field: "capacity",
      type: "numeric",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Generation",
      field: "generation", // optional, just for filtering/sorting
      render: (rowData) => rowData.generationName || '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allGenerations?.map((g) => ({ value: g, label: g.name })) || [],
          "id"
        ),
    },
    {
      title: "Semester",
      field: "semester", // optional
      render: (rowData) => rowData.semesterName || '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allSemesters?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
        ),
    },
    
  ];

  return (
    <CustomMaterialTable
      title="Manage Student Groups"
      columns={columns}
      service={studentGroupService}
      queryKey={QueryKeys.STUDENT_GROUPS}
      errorRef={errorRef}
    />
  );
}
