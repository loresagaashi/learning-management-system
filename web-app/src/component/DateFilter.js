import {MenuItem, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {endOfMonth, endOfQuarter, endOfToday, endOfWeek, startOfMonth, startOfQuarter, startOfToday, startOfWeek} from "date-fns";
import {KeyboardDatePicker} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "35em",
    },
    select: {
        width: "10em",
    },
    datePicker: {
        width: "10em"
    }
}));

const periods = [
    {label: "Custom", from: () => startOfToday(), to: () => endOfToday()},
    {label: "Today", from: () => startOfToday(), to: () => endOfToday()},
    {label: "This Week", from: () => startOfWeek(new Date()), to: () => endOfWeek(new Date())},
    {label: "This Month", from: () => startOfMonth(new Date()), to: () => endOfMonth(new Date())},
    {label: "This Quarter", from: () => startOfQuarter(new Date()), to: () => endOfQuarter(new Date())}
]
const customPeriod = periods[0];
const initialPeriod = periods[2];

export default function DateFilter({rangeRef}) {

    const classes = useStyles();
    const [period, setPeriod] = useState(initialPeriod);
    const [from, setFrom] = useState(initialPeriod.from());
    const [to, setTo] = useState(initialPeriod.to());

    rangeRef.current = {from: from, to: to};

    function handleFromChange(newDate) {
        setFrom(newDate);
        setPeriod(customPeriod);
    }

    function handleToChange(newDate) {
        setTo(newDate);
        setPeriod(customPeriod);
    }

    function handlePeriodChange(event) {
        const newPeriod = event.target.value;
        setPeriod(newPeriod);
        setFrom(newPeriod.from());
        setTo(newPeriod.to());
    }

    return (
      <Box display="flex" alignItems="flex-end" justifyContent="space-between" className={classes.root}>
          <TextField
            select
            label="Period"
            className={classes.select}
            value={period}
            onChange={handlePeriodChange}
            variant="standard"
          >
              {periods.map(p => (<MenuItem key={p.label} value={p}>{p.label}</MenuItem>))}
          </TextField>
          <KeyboardDatePicker
            className={classes.datePicker}
            variant="inline"
            value={from}
            onChange={handleFromChange}
            format="MM/dd/yyyy"
          />
          <Typography variant="body1" component="span">to</Typography>
          <KeyboardDatePicker
            className={classes.datePicker}
            variant="inline"
            value={to}
            onChange={handleToChange}
            format="MM/dd/yyyy"
          />
      </Box>
    );
}

DateFilter.propTypes = {
    rangeRef: PropTypes.any.isRequired
}