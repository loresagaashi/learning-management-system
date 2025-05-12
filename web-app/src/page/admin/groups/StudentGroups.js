import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { StudentGroupService } from "../../../service/StudentGroupService";
import { GenerationService } from "../../../service/GenerationService";

const studentGroupService = new StudentGroupService();
const generationService = new GenerationService();

export default function StudentGroups() {
  const errorRef = useRef();

  const { data: allGenerations } = useQuery(QueryKeys.GENERATIONS, () =>
    generationService.findAll()
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
      field: "generation",
      render: (rowData) => rowData.generation?.name || "N/A",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allGenerations?.map((g) => ({ value: g, label: g.name })) || [],
          "id"
        ),
    },
  ];

  return (
    <CustomMaterialTable
      title="Student Groups"
      columns={columns}
      service={studentGroupService}
      queryKey={QueryKeys.STUDENT_GROUPS}
      errorRef={errorRef}
    />
  );
}
