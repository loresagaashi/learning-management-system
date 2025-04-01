import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LockIcon from "@material-ui/icons/Lock";
// import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";
import { LectureService } from "../../../service/LectureService";
import { useQuery } from "react-query";

const lectureService = new LectureService();

const courseService = new CourseService();

export default function LecturesView({}) {
  const errorRef = useRef();

  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );
  const columns = [
    {
      title: "Id",
      field: "id",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Course",
      field: "course",
      render: (rowData) => rowData.course?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCourses?.map((x) => ({ value: x, label: x.name })) || [],
          "id"
        ),
    },
    {
      title: "Lecture Date",
      type: "date",
      field: "lectureDate",
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
      title: "Topic",
      field: "topic",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Lectures"
      columns={columns}
      service={lectureService}
      queryKey={QueryKeys.LECTURE}
      errorRef={errorRef}
    />
  );
}
