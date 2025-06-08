import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  EnumSelectTableCell,
  PriceFieldTableCell,
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { PaymentService } from "../../../service/PaymentService";
import { StudentService } from "../../../service/StudentService";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const paymentService = new PaymentService();
const studentService = new StudentService();
const initialTime = new Date();
export default function PaymentView({}) {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENTS, () =>
    studentService.findAll()
  );

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: "never",
    },
    {
      title: "Student",
      field: "student",
      render: (rowData) => rowData.student ? `${rowData.student.firstName} ${rowData.student.lastName}` : '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allStudents?.map((x) => ({ value: x, label: `${x.firstName} ${x.lastName}` })) || [],
          "id",
        ),
    },
    {
      title: "Amount",
      field: "amount",
      render: rowData => `${rowData.salary.toFixed(2)}$`,
      editComponent: (props) => PriceFieldTableCell(props, errorRef), 
    },
    {
      title: 'Payment Date',
      field: 'paymentDate',
      initialEditValue: initialTime,editComponent: props => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            {...props}
            inputVariant="outlined"
            format="yyyy-MM-dd HH:mm" 
            showTodayButton
            autoOk
            error={Boolean(props.helperText)}
        />
    </MuiPickersUtilsProvider>
    )
    },
    {
      title: "Payment Method",
      field: "paymentMethod",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "CREDIT_CARD", label: "Credit Card" },
          { value: "PAYPAL", label: "PayPal" },
          { value: "BANK_TRANSFER", label: "Bank Transfer" },
        ]),
    },
    {
      title: "Payment Status",
      field: "paymentStatus",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "COMPLETED", label: "Completed" },
          { value: "PENDING", label: "Pending" },
          { value: "FAILED", label: "Failed" },
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
      title="Manage Payments"
      columns={columns}
      service={paymentService}
      queryKey={QueryKeys.PAYMENT}
      errorRef={errorRef}
    />
  );
}
