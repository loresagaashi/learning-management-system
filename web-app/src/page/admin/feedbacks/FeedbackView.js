import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { FeedbackService } from "../../../service/FeedbackService";
import { StudentService } from "../../../service/StudentService";
import { CourseService } from "../../../service/CourseService";
import { useQuery } from "react-query";

const feedbackService = new FeedbackService();
const studentService = new StudentService();
const courseService = new CourseService();

export default function FeedbackView({}) {
  const errorRef = useRef();

  const { data: allStudents } = useQuery(QueryKeys.STUDENT, () =>
    studentService.findAll()
  );

  const { data: allCourses } = useQuery(QueryKeys.COURSE, () =>
    courseService.findAll()
  );

  const columns = [
    {
      title: "Id",
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
      title: "Rating",
      field: "rating",
      type: "numeric",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Comment",
      field: "comment",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Timestamp",
      field: "timestamp",
      type: "datetime",
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
      title="Manage Feedbacks"
      columns={columns}
      service={feedbackService}
      queryKey={QueryKeys.FEEDBACK}
      errorRef={errorRef}
    />
  );
}
