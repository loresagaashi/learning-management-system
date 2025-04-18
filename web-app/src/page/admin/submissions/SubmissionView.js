import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { SubmissionService } from "../../../service/SubmissionService";
import { AssignmentService } from "../../../service/AssignmentService";
import { useQuery } from "react-query";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { StudentService } from "../../../service/StudentService";

const submissionService = new SubmissionService();
const assignmentService = new AssignmentService();
const studentService = new StudentService();

export default function SubmissionView({}) {
  const errorRef = useRef();

  const { data: allAssignments } = useQuery(QueryKeys.ASSIGNMENT, () =>
    assignmentService.findAll()
  );

  const { data: allStudents } = useQuery(QueryKeys.STUDENTS, () =>
    studentService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Assignment",
      field: "assignment",
      render: (rowData) => rowData.assignment?.title,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allAssignments?.map((x) => ({ value: x, label: x.title })) || [],
          "id"
        ),
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
      title: "Submission Date",
      type: "date",
      field: "submissionDate",
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
      title: "File URL",
      field: "fileUrl",
      editComponent: (props) => (
        <input
          type="file"
          onChange={(event) => props.onChange(event.target.files[0]?.name)}
        />
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
      title="Manage Submissions"
      columns={columns}
      service={submissionService}
      queryKey={QueryKeys.SUBMISSION}
      errorRef={errorRef}
    />
  );
}
