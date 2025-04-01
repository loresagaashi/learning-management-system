import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { PaymentService } from "../../../service/PaymentService";
// import { StudentService } from "../../../service/StudentService";

const paymentService = new PaymentService();
// const studentService = new StudentService();

export default function PaymentView({}) {
  const errorRef = useRef();

//   const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
//     studentService.findAll()
//   );

  const columns = [
    {
      title: "ID",
      field: "id",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Student",
      field: "student",
      // render: (rowData) => rowData.student?.fullName,
      // editComponent: (props) =>
      //   SelectTableCell(
      //     props,
      //     errorRef,
      //     allStudents?.map((x) => ({ value: x, label: x.fullName })) || [],
      //     "id"
      //   ),
    },
    {
      title: "Amount",
      field: "amount",
      type: "currency",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Payment Date",
      field: "paymentDate",
      type: "datetime",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Payment Method",
      field: "paymentMethod",
      render: (rowData) => rowData.paymentMethod,
      editComponent: (props) =>
        SelectTableCell(props, errorRef, [
          { value: "CREDIT_CARD", label: "Credit Card" },
          { value: "PAYPAL", label: "PayPal" },
          { value: "BANK_TRANSFER", label: "Bank Transfer" },
        ]),
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => rowData.status,
      editComponent: (props) =>
        SelectTableCell(props, errorRef, [
          { value: "COMPLETED", label: "Completed" },
          { value: "PENDING", label: "Pending" },
          { value: "FAILED", label: "Failed" },
        ]),
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
