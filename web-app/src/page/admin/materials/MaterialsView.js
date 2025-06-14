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

const materialService = new MaterialService();
const lectureService = new LectureService();

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
      field: "lectureId",  // Field to display lecture name
      render: (rowData) => rowData.lecture?.name,  // Show lecture name
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allLectures?.map((x) => ({ value: x.id, label: x.name })) || [],  // Populate lecture options with name
          "lectureId" // Store lecture ID in the final object
        ),
    },
    {
      title: 'File',
      field: 'fileUrl',
      render: rowData => rowData.fileUrl ? (
        <a href={rowData.fileUrl} target="_blank" rel="noopener noreferrer">
          {rowData.fileUrl.split('/').pop()}
        </a>
      ) : '—',
      editComponent: props => (
        <input
          type="file"
          onChange={event => props.onChange(event.target.files[0])}
        />
      )
    },
    {
      title: "Description",
      field: "description",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
  ];

  const handleSave = async (material) => {
    await materialService.saveMaterialWithLecture(material);
  };

  return (
    <CustomMaterialTable
      title="Manage Materials"
      columns={columns}
      service={materialService}
      queryKey={QueryKeys.MATERIAL}
      errorRef={errorRef}
      onSave={handleSave}
    />
  );
}