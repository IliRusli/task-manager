import * as React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ComponentWithLabelContainer = styled.div`
  display: grid;
  border-radius: 3px;
  input {
    height: 2rem;
    font-size: 1em;
    margin: 0.5rem 0 1rem;
  }
`;

interface DatePickerWithLabelProps {
  title: string;
  startDate: Date;
  setStartDate: (value: Date) => void;
}

const DatePickerWithLabel = (props: DatePickerWithLabelProps) => {
  const { title, startDate, setStartDate } = props;
  return (
    <ComponentWithLabelContainer>
      <label>{title}</label>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
    </ComponentWithLabelContainer>
  );
};

export default DatePickerWithLabel;
