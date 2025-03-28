import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const DateTextFieldCell = ({ value, onChange }) => {
  const [formattedDate, setFormattedDate] = useState(formatDate(value));

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setFormattedDate(newDate);
    onChange(newDate); // Assuming onChange expects a string date format
  };

  return (
    <TextField
      type="date"
      value={formattedDate}
      onChange={handleDateChange} 
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

DateTextFieldCell.propTypes = {
  value: PropTypes.string.isRequired, // Assuming the value is a string in 'yyyy-MM-dd' format
  onChange: PropTypes.func.isRequired,
};

const formatDate = (date) => {
  if (!date) return ""; // Handle null or undefined values

  const parsedDate = new Date(date);
  return parsedDate.toISOString().split("T")[0];
};