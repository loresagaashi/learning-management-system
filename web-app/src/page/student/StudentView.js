import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LockIcon from "@material-ui/icons/Lock";
import { StudentService } from "../../../service/StudentService";


const studentService = new StudentService();

export default function StudentView({}) {
  const errorRef = useRef();

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
        title: "Enrollment Date",
        field: "enrollmentDate",
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
  ];

  return (
    <CustomMaterialTable
      title="Manage Students"
      columns={columns}
      service={studentService}
      queryKey={QueryKeys.COURSE}
      errorRef={errorRef}
    />
  );
}
