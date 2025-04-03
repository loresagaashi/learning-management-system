import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ProfessorService } from "../../../service/ProfessorService";
import { CityService } from "../../../service/CityService";
import Lock from "@material-ui/icons/Lock";
import PasswordEditComponent from "../../../component/PasswordEditComponent";

const professorService = new ProfessorService();
const cityService = new CityService();

export default function ProfessorView({}) {
  const errorRef = useRef();

  const { data: allCities } = useQuery(QueryKeys.CITY, () =>
    cityService.findAll()
  );  

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
      title: "Department",
      field: "department",
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
      render: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Lock />
          <span style={{ marginLeft: 5 }}>••••••••</span>
        </div>
      ),
      editComponent: (props) => <PasswordEditComponent {...props} />,
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
      title: "City",
      field: "city",
      render: (rowData) => rowData.city?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCities?.map((x) => ({ value: x, label: x.name })) || [],
          "id",
      ),
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
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
      title="Manage Professors"
      columns={columns}
      service={professorService}
      queryKey={QueryKeys.PROFESSOR}
      errorRef={errorRef}
    />
  );
}
