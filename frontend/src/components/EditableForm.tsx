import { useState } from "react";
import styled from "styled-components";
import * as React from "react";
import DatePickerWithLabel from "./DatePickerWithLabel";
import InputWithLabel from "./InputWithLabel";
import { BaseTask, Task } from "../types/tasks";

const ContainerStyles = styled.div`
  margin: 1rem;
  display: grid;
  background: cornsilk;
  form {
    border: 2px solid darkgrey;
    border-radius: 5px;
    padding: 1rem;
  }
`;

const ButtonStyles = styled.button`
  background: cornflowerblue;
  color: white;
  width: 100%;
  height: 3rem;
  font-size: 1em;
  padding: 0.25em 1em;
  margin-top: 1rem;
  border: 2px solid darkgrey;
  border-radius: 5px;
`;

interface EditFormProps {
  task?: Task;
  onSave: (task: BaseTask, id?: string) => void;
}

const EditableForm = (props: EditFormProps) => {
  const [taskName, setTaskName] = useState(props.task?.name || "");
  const [taskDescription, setTaskDescription] = useState(
    props.task?.description || ""
  );
  const [taskDueDate, setTaskDueDate] = useState(
    props.task?.dueDate ? new Date(props.task?.dueDate) : new Date()
  );

  const getValues = () => ({
    name: taskName,
    description: taskDescription,
    dueDate: taskDueDate,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSave(getValues(), props.task?.id);
  };

  return (
    <ContainerStyles>
      <form onSubmit={onSubmit}>
        <InputWithLabel
          title={"Name"}
          value={taskName}
          onChange={setTaskName}
        />
        <InputWithLabel
          title={"Description"}
          value={taskDescription}
          onChange={setTaskDescription}
        />
        <DatePickerWithLabel
          title={"Due Date"}
          startDate={taskDueDate}
          setStartDate={setTaskDueDate}
        />
        <ButtonStyles type="submit">Save</ButtonStyles>
      </form>
    </ContainerStyles>
  );
};

export default EditableForm;
