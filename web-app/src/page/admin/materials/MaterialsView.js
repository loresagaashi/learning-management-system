import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { LectureService } from "../../../service/LectureService";
import { useQuery } from "react-query";
import { MaterialService } from "../../../service/MaterialService";
import { LectureDocumentService } from "../../../service/LectureDocumentService";

const materialService = new MaterialService();
const lectureService = new LectureService();
const lectureDocumentService = new LectureDocumentService();


export default function MaterialsView({}) {
  const errorRef = useRef();

  const { data: allLectures } = useQuery(QueryKeys.LECTURE, () =>
    lectureService.findAll()
  );
  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Lecture",
      field: "lecture",
      render: (rowData) => rowData.lecture?.name ?? "No lecture",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allLectures?.map((x) => ({ value: x, label: x.name })) || [],
          "id",
        ),
    },    
    {
        title: 'File Url',
        field: 'fileUrl',
        editComponent: props => (
          <input
            type={"file"}
            onChange={event => props.onChange(event.target.files[0].name)}
          />
        )
      },
    {
      title: "Description",
      field: "description",
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
      title="Manage Materials"
      columns={columns}
      service={materialService}
      queryKey={QueryKeys.MATERIAL}
      errorRef={errorRef}
    />
  );
}
