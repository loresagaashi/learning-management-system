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
  const { data: materials } = useQuery(QueryKeys.MATERIAL, () =>
    materialService.findAllWithLecture() // Assuming the service fetches materials with lecture
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Lecture",
      field: "lectureName",  // Field to display lecture name
      render: (rowData) => rowData.lectureName,  // Show lecture name
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allLectures?.map((x) => ({ value: x.id, label: x.name })) || [],  // Populate lecture options with name
          "lectureId" // Store lecture ID in the final object
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
  ];

  const handleSave = async (material) => {
    const lectureId = material.lectureId;
    await materialService.saveMaterialWithLecture(material, lectureId);
  };

  return (
    <CustomMaterialTable
      title="Manage Materials"
      columns={columns}
      data={materials}
      service={materialService}
      queryKey={QueryKeys.MATERIAL}
      errorRef={errorRef}
      onSave={handleSave}
    />
  );
}