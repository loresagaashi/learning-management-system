import DateFnsUtils from "@date-io/date-fns";
import { Snackbar, Switch } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { GenerationService } from "../../../service/GenerationService";
import { QueryKeys } from "../../../service/QueryKeys";
import { SemesterService } from "../../../service/SemesterService";

const generationService = new GenerationService();
const semesterService = new SemesterService();

export default function SemesterView() {
  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: allGenerations } = useQuery(QueryKeys.GENERATIONS, () =>
    generationService.findAll()
  );

  // Funksion për kapjen e gabimeve nga backend dhe shfaqjen ne popup
  const handleError = (error) => {
    // Kontrollo nëse error ka mesazhin nga backend
    if (error?.response?.data?.message) {
      setErrorMessage(error.response.data.message);
    } else if (error?.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Gabim i panjohur gjatë ruajtjes.");
    }
  };

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
      render: (rowData) => rowData.generationName || rowData.generation?.name || "",
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allGenerations?.map((g) => ({ value: g, label: g.name })) || [],
          "id"
        ),
    },
    {
      title: "Active",
      field: "active",
      type: "boolean",
      editComponent: (props) => (
        <Switch
          checked={Boolean(props.value)}
          onChange={(e) => props.onChange(e.target.checked)}
          color="primary"
        />
      ),
      render: (rowData) => (rowData.active ? "Yes" : "No"),
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
    <>
      <CustomMaterialTable
        title="Manage Semesters"
        columns={columns}
        service={semesterService}
        queryKey={QueryKeys.SEMESTER}
        errorRef={errorRef}
        onError={handleError}  // Kjo prop duhet të kapë gabimet gjatë save
      />

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
