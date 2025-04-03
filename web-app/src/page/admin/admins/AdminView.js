import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AdminService } from "../../../service/AdminService";
import { Lock } from "@material-ui/icons"; 
import PasswordEditComponent from "../../../component/PasswordEditComponent";

const adminService = new AdminService();

export default function AdminView() {
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
      title: "Phone Number",
      field: "phoneNumber",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Type",
      field: "type",
      editable: "never",
      defaultValue: "Admin",
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
      title="Manage Admins"
      columns={columns}
      service={adminService}
      queryKey={QueryKeys.ADMIN}
      errorRef={errorRef}
    />
  );
}
