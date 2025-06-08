import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { AssignmentService } from "../../../service/AssignmentService";
import { CourseService } from "../../../service/CourseService";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const assignmentService = new AssignmentService();
const courseService = new CourseService();

export default function AssignmentView() {
  const errorRef = useRef();

  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never"
    },
    {
      title: "Course",
      field: "course",
      render: (rowData) => rowData.course?.name || "N/A",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCourses?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
        ),
    },
    {
      title: "Title",
      field: "title",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Description",
      field: "description",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Due Date",
      field: "dueDate",
      type: "date",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={props.value}
            onChange={(date) => props.onChange(date)}
            format="yyyy-MM-dd"
            inputVariant="outlined"
            fullWidth
          />
        </MuiPickersUtilsProvider>
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
      title="Manage Assignments"
      columns={columns}
      service={assignmentService}
      queryKey={QueryKeys.ASSIGNMENT}
      errorRef={errorRef}
    />
  );
}
