import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import { MultipleCheckboxTableCell, SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { CourseService } from "../../../service/CourseService";
import { ProfessorService } from "../../../service/ProfessorService";
import { OrientationService } from "../../../service/OrientationService";

const courseService = new CourseService();
const professorService = new ProfessorService();
const orientationService = new OrientationService();

export default function CoursesView({}) {
  const errorRef = useRef();

  const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
    professorService.findAll(),
  );
  const { data: allOrientations } = useQuery(QueryKeys.ORIENTATION, () =>
    orientationService.findAll(),
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
      title: "Description",
      field: "description",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: 'Professors',
      field: 'professor',
      render: rowData => rowData.professor?.map(x => x.firstName).join(", "),
      editComponent: props => MultipleCheckboxTableCell(props, allProfessors, item => item.firstName)
  },
    
    {
      title: "Orientation",
      field: "orientation",
      render: (rowData) => rowData.orientation?.name || '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allOrientations?.map((x) => ({ value: x, label: x.name })) || [],
          "id",
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
      title="Manage Courses"
      columns={columns}
      service={courseService}
      queryKey={QueryKeys.COURSE}
      errorRef={errorRef}
    />
  );
}
