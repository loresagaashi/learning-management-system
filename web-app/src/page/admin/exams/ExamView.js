import { useRef } from "react";
import { useQuery } from "react-query";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import {
  SelectTableCell,
  TextFieldTableCell
} from "../../../component/TableCells";
import { CourseService } from "../../../service/CourseService";
import { ExamService } from "../../../service/ExamService";
import { ProfessorService } from "../../../service/ProfessorService";
import { QueryKeys } from "../../../service/QueryKeys";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format, parseISO } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const courseService = new CourseService();
const professorService = new ProfessorService();
const examService = new ExamService();

export default function ExamView({}) {
  const errorRef = useRef();

  const { data: allProfessors } = useQuery(QueryKeys.PROFESSOR, () =>
    professorService.findAll()
  );
  const { data: allCourse } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Title",
      field: "title",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "DateTime",
      field: "dateTime",
      render: (rowData) => rowData.dateTime ? format(new Date(rowData.dateTime), 'dd/MM/yyyy HH:mm') : '',
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            value={props.value ? new Date(props.value) : null}
            onChange={(newValue) => props.onChange(newValue)}
            inputVariant="outlined"
            format="yyyy-MM-dd HH:mm"
            ampm={false}
            showTodayButton
            autoOk
            error={Boolean(props.helperText)}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "Location",
      field: "location",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Professor",
      field: "professor",
      render: (rowData) => rowData.professor?.firstName + " " + rowData.professor?.lastName,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allProfessors?.map((x) => ({ value: x, label: x.firstName + " " + x.lastName })) || [],
          "id"
        ),
    },
    {
      title: "Course",
      field: "course",
      render: (rowData) => rowData.course?.name || "",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCourse?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
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
      title="Manage Exams"
      columns={columns}
      service={examService}
      queryKey={QueryKeys.EXAM}
      errorRef={errorRef}
    />
  );
}
