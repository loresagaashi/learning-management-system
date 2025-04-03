import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { OrientationService } from "../../../service/OrientationService";
import { CourseService } from "../../../service/CourseService";
import { useQuery } from "react-query";

const orientationService = new OrientationService();
const courseService = new CourseService();

export default function OrientationView({}) {
  const errorRef = useRef();

  // Fetching all courses
  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Courses",
      field: "courses",
      render: (rowData) => rowData.courses?.map((course) => course.name).join(", "),
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCourses?.map((x) => ({ value: x.id, label: x.name })) || [],
          "value", // Key for selection
          true // Allows multiple selection
        ),
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
      title="Manage Orientations"
      columns={columns}
      service={orientationService}
      queryKey={QueryKeys.ORIENTATION}
      errorRef={errorRef}
    />
  );
}
