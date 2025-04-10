import ValidTextField from "./common/ValidTextField";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@material-ui/core";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { isValid } from "date-fns";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

export const TextFieldTableCell = (
  props,
  errorRef,
  type,
  textFieldProps = {},
) => (
  <ValidTextField
    {...textFieldProps}
    type={type}
    fullWidth
    label={props.columnDef.title}
    value={props.value || (type === "number" ? 0 : "")}
    onChange={(e) => props.onChange(e.target.value)}
    error={errorRef.current && errorRef.current[props.columnDef.field]}
  />
);

export const SelectTableCell = (props, errorRef, menuItems, equalOn) => {
  const value =
    equalOn && props.value
      ? menuItems
          .map((x) => x.value)
          .find((x) => x[equalOn] === props.value[equalOn])
      : props.value;

  return (
    <ValidTextField
      select
      id="select"
      fullWidth
      sx={{ m: 1, minWidth: 120 }}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      value={value || {}}
      onChange={(e) => props.onChange(e.target.value)}
      label={props.columnDef.title}
    >
      {menuItems.map((item, i) => (
        <MenuItem key={i} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </ValidTextField>
  );
};

export const EnumSelectTableCell = (props, errorRef, enumValues) => {
  return (
    <ValidTextField
      select
      fullWidth
      sx={{ m: 1, minWidth: 120 }}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      label={props.columnDef.title}
    >
      {enumValues.map((enumValue, index) => (
        <MenuItem key={index} value={enumValue.value}>
          {enumValue.label}
        </MenuItem>
      ))}
    </ValidTextField>
  );
};


export const TimeTableCell = (props, errorRef) => {
  console.log("val", props);
  const value =
    typeof props.value === "string"
      ? new Date("01/01/1970 " + props.value)
      : props.value;
  const [dateFormatError, setDateFormatError] = useState("");

  function handleDateChange(value) {
    console.log("val22", value);
    if (!isValid(value)) {
      setDateFormatError("Invalid date");
    } else {
      setDateFormatError("");
    }

    props.onChange(value);
  }

  const error = errorRef.current && errorRef.current[props.columnDef.field];

  return (
    <KeyboardTimePicker
      label={props.columnDef.title}
      placeholder="08:00 AM"
      required
      minutesStep={5}
      mask="__:__ _M"
      value={value}
      onChange={handleDateChange}
      error={!!error || !!dateFormatError}
      helperText={error?.message || dateFormatError}
    />
  );
};

export const MultipleCheckboxTableCell = (props, allItems, renderLabel) => {
  const values = props.value || [];
  const valueIds = values.map((x) => x.id);

  

  return (
    <FormGroup row>
      {allItems.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              key={item.id}
              checked={valueIds.includes(item.id)}
              onChange={() => {
                const newValues = valueIds.includes(item.id)
                  ? values.filter((x) => x.id !== item.id)
                  : [...values, item];
                props.onChange(newValues);
              }}
              name={props.columnDef.title}
              color="secondary"
            />
          }
          label={renderLabel(item)}
        />
      ))}
    </FormGroup>
  );
};

export const NumberFieldTableCell = (props, errorRef, textFieldProps = {}) => {
  const { columnDef, value, onChange } = props;
  return (
    <TextField
      {...textFieldProps}
      type="number"
      fullWidth
      label={columnDef?.title}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      error={errorRef.current && errorRef.current[columnDef.field]}
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.42)" }}
    />
  );
};

export const PriceFieldTableCell = (props, errorRef, textFieldProps = {}) => {
  const parseValue = (value) => {
    return parseFloat(value.replace("$", ""));
  };

  const formatValue = (value) => {
    if (value && typeof value === "number") {
      return `${value.toFixed(2)} $`;
    } else {
      return "";
    }
  };

  const [editedValue, setEditedValue] = useState(formatValue(props.value));

  const handleChange = (e) => {
    const newValue = e.target.value;
    setEditedValue(newValue);
    props.onChange(parseValue(newValue));
  };

  return (
    <TextField
      {...textFieldProps}
      type="text"
      fullWidth
      label={props.columnDef.title}
      value={editedValue}
      onChange={handleChange}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.42)" }}
    />
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TimePickers({ value, onChange }) {
  const classes = useStyles();
  const [timeValue, setTimeValue] = useState(value || "07:30");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTimeValue(newValue);
    onChange(newValue);
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Change time"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={handleChange}
      />
    </form>
  );
}

export const DayOfWeekTableCell = (props, errorRef) => {
  const daysOfWeek = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
    { value: "SATURDAY", label: "Saturday" },
    { value: "SUNDAY", label: "Sunday" },
  ];

  return (
    <ValidTextField
      select
      fullWidth
      sx={{ m: 1, minWidth: 120 }}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      label={props.columnDef.title}
    >
      {daysOfWeek.map((day, index) => (
        <MenuItem key={index} value={day.value}>
          {day.label}
        </MenuItem>
      ))}
    </ValidTextField>
  );
};
