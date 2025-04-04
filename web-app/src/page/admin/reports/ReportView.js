import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { useQuery } from "react-query";
import { ReportService } from "../../../service/ReportService";
import { StudentService } from "../../../service/StudentService";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const reportService = new ReportService();
const studentService = new StudentService();
export default function ReportView() {
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
      title: "Report Date",
      type: "date",
      field: "reportDate",
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
      title: "Performance",
      field: "performance",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
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
      title="Manage Reports"
      columns={columns}
      service={reportService}
      queryKey={QueryKeys.REPORT}
      errorRef={errorRef}
    />
  );
}
