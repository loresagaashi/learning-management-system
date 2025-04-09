import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import { EnumSelectTableCell, NumberFieldTableCell, SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StudentService } from "../../../service/StudentService";
import { CityService } from "../../../service/CityService";
import LockIcon from "@material-ui/icons/Lock";
import PasswordEditComponent from "../../../component/PasswordEditComponent";

const studentService = new StudentService();
const cityService = new CityService();

export default function StudentView({}) {
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
      title: "Type",
      field: "type",
      editable: "never",
      defaultValue: "Student",
    },
    {
      title: "Student ID",
      field: "studentId",
      editComponent: (props) => NumberFieldTableCell(props, errorRef),
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
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Password",
      field: "password",
      render: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <LockIcon />
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
      render: (rowData) => rowData.city?.name ,
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
      title: "Enrollment Date",
      field: "enrollmentDate",
      type:"date",
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
      title: "Status",
      field: "status",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "ACTIVE", label: "ACTIVE" },
          { value: "INACTIVE", label: "INACTIVE" },
          { value: "GRADUATED", label: "GRADUATED" },
        ]),
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
      title="Manage Students"
      columns={columns}
      service={studentService}
      queryKey={QueryKeys.STUDENTS}
      errorRef={errorRef}
    />
  );
}
