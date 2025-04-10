import { useState, useEffect, useRef } from "react";
import { StudentService } from "../service/StudentService";
import { NumberFieldTableCell } from "./TableCells";

const studentService = new StudentService();

const StudentIdComponent = (props) => {
  const initialized = useRef(false);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    if (!initialized.current && !props.value) {
      const fetchAndSet = async () => {
        const students = await studentService.findAll();
        
        const currentYear = new Date().getFullYear().toString();
        const currentYearSuffix = currentYear.slice(-2);
        const nextYearSuffix = (parseInt(currentYearSuffix) + 1).toString().padStart(2, '0');        
        const yearPrefix = currentYearSuffix + nextYearSuffix;

        const lastId = students
          .map((s) => String(s.studentId))
          .filter((id) => id.startsWith(yearPrefix))
          .map((id) => parseInt(id))
          .filter((id) => !isNaN(id)) 
          .sort((a, b) => b - a)[0] || parseInt(yearPrefix + "0000");

        const newId = lastId + 1;
        setValue(newId);
        props.onChange(newId);
      };

      fetchAndSet();
      initialized.current = true;
    }
  }, [props]);

  return <NumberFieldTableCell {...props} value={value} />;
};

export default StudentIdComponent;
