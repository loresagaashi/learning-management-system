import AdvancedWideTable from "../../../component/dashboard/AdvancedWideTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import { EnumSelectTableCell, SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StudentService } from "../../../service/StudentService";
import { CityService } from "../../../service/CityService";
import LockIcon from "@material-ui/icons/Lock";
import PasswordEditComponent from "../../../component/PasswordEditComponent";
import StudentIdComponent from "../../../component/StudentIdComponent";

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
      width: 80,
    },
    {
      title: "Type",
      field: "type",
      editable: "never",
      defaultValue: "Student",
      width: 100,
    },
    {
      title: "Student ID",
      field: "studentId",
      editComponent: (props) => <StudentIdComponent  {...props}/>,
      width: 120,
    },
    {
      title: "First Name",
      field: "firstName",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
      width: 150,
    },
    {
      title: "Last Name",
      field: "lastName",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
      width: 150,
    },
    {
      title: "Email",
      field: "email",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
      width: 200,
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
      editComponent: (props) => <PasswordEditComponent {...props} placeholder="Enter password" />,
      width: 120,
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
            placeholder="Select birth date"
            label="Birth Date"
          />
        </MuiPickersUtilsProvider>
      ),
      width: 130,
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
      width: 120,
    },  
    {
      title: "Phone Number",
      field: "phoneNumber",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
      width: 140,
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
            placeholder="Select enrollment date"
            label="Enrollment Date"
          />
        </MuiPickersUtilsProvider>
      ),
      width: 140,
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
      width: 120,
    },
    {
      title: "Gender",
      field: "gender",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "M", label: "M" },
          { value: "F", label: "F" },
        ]),
      width: 80,
    },
    {
      title: "Created On",
      field: "createdOn",
      type: "date",
      editable: "never",
      width: 130,
    },
    {
      title: "Updated On",
      field: "updatedOn",
      type: "date",
      editable: "never",
      width: 130,
    },
  ];

  const defaultVisibleColumns = [
    "id", "studentId", "firstName", "lastName", "email", 
    "status", "city", "phoneNumber", "enrollmentDate"
  ];

  return (
    <AdvancedWideTable
      title="Manage Students"
      columns={columns}
      service={studentService}
      queryKey={QueryKeys.STUDENTS}
      errorRef={errorRef}
      defaultVisibleColumns={defaultVisibleColumns}
      enableColumnVisibility={true}
      maxColumnsBeforeScroll={10}
    />
  );
}
