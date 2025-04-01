import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LockIcon from "@material-ui/icons/Lock";
import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";

const courseService = new CourseService();
//masi qe te shtohet profesori dhe orientation
// const professorsService = new ProfessorService();
// const orientationsService = new OrientationService();

export default function CoursesView({}) {
  const errorRef = useRef();

//   const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
//     professorsService.findAll(),
//   );
//   const { data: allOrientations } = useQuery(QueryKeys.ORIENTATION, () =>
//     orientationsService.findAll(),
//   );
  const columns = [
    {
        title: "Id",
        field: "id",
        editComponent: (props) => TextFieldTableCell(props, errorRef),
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
 
  
         //masi qe te shtohet Profesori
    //   {
    //     title: "Professor",
    //     field: "professor",
    //     render: (rowData) => rowData.professor?.name,
    //     editComponent: (props) =>
    //       SelectTableCell(
    //         props,
    //         errorRef,
    //         allProfessors?.map((x) => ({ value: x, label: x.name })) || [],
    //         "id",
    //       ),
    //   },
    //masi qe te shtohet Orientation
    // {
    //     title: "Orientation",
    //     field: "orientation",
    //     render: (rowData) => rowData.orientation?.name,
    //     editComponent: (props) =>
    //       SelectTableCell(
    //         props,
    //         errorRef,
    //         allOrinetations?.map((x) => ({ value: x, label: x.name })) || [],
    //         "id",
    //       ),
    //   },
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
