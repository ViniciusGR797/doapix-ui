import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./styles.module.scss";

interface InputDateProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const InputDate: React.FC<InputDateProps> = ({ selectedDate, onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedDate);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="dd/MM/yyyy"
      className={styles.inputDate}
    />
  );
};

export default InputDate;
