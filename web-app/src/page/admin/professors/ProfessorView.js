import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ProfessorService } from "../../../service/ProfessorService";

const professorService = new ProfessorService();

export default function ProfessorView({}) {
  const errorRef = useRef();

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: "never",
    },
    {
      title: "First Name",
      field: "firstName",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Last Name",
      field: "lastName",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Email",
      field: "email",
      editable: "never", 
    },
    {
      title: "Password",
      field: "password",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Birth Date",
      field: "birthDate",
      type: "date",
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={props.value || null}
            onChange={(date) => props.onChange(date)}
            format="yyyy-MM-dd"
            inputVariant="outlined"
            fullWidth
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Status",
      field: "status",
      // editable: "never",
      defaultValue: "Professor",
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Professors"
      columns={columns}
      service={professorService}
      queryKey={QueryKeys.PROFESSOR}
      errorRef={errorRef}
    />
  );
}
