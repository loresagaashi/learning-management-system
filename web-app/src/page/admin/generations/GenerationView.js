import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { EnumSelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { GenerationService } from "../../../service/GenerationService";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { format, parseISO } from 'date-fns';

const generationService = new GenerationService();

export default function GenerationView() {
  const errorRef = useRef();

  const currentYear = new Date().getFullYear();
  const defaultName = `${currentYear}/${currentYear + 1}`;

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
      initialEditValue: defaultName,
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Degree Type",
      field: "degreeType",
      editComponent: (props) =>
        EnumSelectTableCell(props, errorRef, [
          { value: "BACHELOR", label: "BACHELOR" },
          { value: "MASTER", label: "MASTER" },
        ]),
    },
    {
      title: "Start Date",
      field: "startDate",
      render: (rowData) => rowData.startDate ? format(parseISO(rowData.startDate), 'dd/MM/yyyy HH:mm') : '',
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            {...props}
            inputVariant="outlined"
            format="yyyy-MM-dd"
            showTodayButton
            autoOk
            error={Boolean(props.helperText)}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: "End Date",
      field: "endDate",
      render: (rowData) => rowData.endDate ? format(parseISO(rowData.endDate), 'dd/MM/yyyy HH:mm') : '',
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            {...props}
            inputVariant="outlined"
            format="yyyy-MM-dd"
            showTodayButton
            autoOk
            error={Boolean(props.helperText)}
          />
        </MuiPickersUtilsProvider>
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
      title="Manage Generations"
      columns={columns}
      service={generationService}
      queryKey={QueryKeys.GENERATIONS}
      errorRef={errorRef}
    />
  );
}
