import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { useQuery } from "react-query";
import { TextFieldTableCell, SelectTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { GenerationService } from "../../../service/GenerationService";
import { SemesterService } from "../../../service/SemesterService";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const generationService = new GenerationService();
const semesterService = new SemesterService();

export default function SemesterView({}) {
  const errorRef = useRef();

  const { data: allGenerations } = useQuery(QueryKeys.GENERATIONS, () =>
    generationService.findAll()
  );

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Season",
      field: "season",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Start Date",
      field: "startDate",
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
      title: "End Date",
      field: "endDate",
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
      title: "Generation",
      field: "generation",
      render: (rowData) => rowData.generation?.name || '',
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allGenerations?.map((g) => ({ value: g, label: g.name })) || [],
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
      title="Manage Semesters"
      columns={columns}
      service={semesterService}
      queryKey={QueryKeys.SEMESTER}
      errorRef={errorRef}
    />
  );
}
