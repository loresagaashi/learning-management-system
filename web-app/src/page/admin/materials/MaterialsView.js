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
      width: 100,
    },
    {
      title: "Lecture",
      field: "lectureId",
      render: (rowData) => {
        if (rowData.lecture) {
          return rowData.lecture.name;
        } else if (rowData.lectureId) {
          return `Lecture ID: ${rowData.lectureId}`;
        } else {
          return "No lecture assigned";
        }
      },
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allLectures?.map((x) => ({ value: x.id, label: x.name })) || [],
          "lectureId"
        ),
    },
    {
      title: 'File',
      field: 'fileUrl',
      render: rowData => {
        if (rowData.fileUrl) {
          const fileName = rowData.fileUrl.split('/').pop();
          return (
            <a href={rowData.fileUrl} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          );
        } else {
          return 'No file';
        }
      },
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
      render: rowData => rowData.description || 'No description',
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Created",
      field: "createdOn",
      editable: "never",
      render: rowData => {
        if (rowData.createdOn) {
          return new Date(rowData.createdOn).toLocaleDateString();
        } else if (rowData.id) {
          // Fallback to extracting timestamp from MongoDB ObjectId
          try {
            const timestamp = parseInt(rowData.id.substring(0, 8), 16) * 1000;
            return new Date(timestamp).toLocaleDateString();
          } catch (e) {
            return 'Unknown';
          }
        }
        return 'Unknown';
      }
    }
  ];

  const handleSave = async (material) => {
    try {
      await materialService.saveMaterialWithLecture(material);
    } catch (error) {
      console.error('Error saving material:', error);
      throw error;
    }
  };

  return (

      <CustomMaterialTable
        title="Materials"
        columns={columns}
        service={materialService}
        queryKey={QueryKeys.MATERIAL}
        errorRef={errorRef}
        onSave={handleSave}
        options={{
          emptyRowsWhenPaging: false,
          showEmptyDataSourceMessage: true,
          emptyDataSourceMessage: "No materials found. Materials will appear here after they are uploaded through the professor's course detail page."
        }}
      />
  );
}