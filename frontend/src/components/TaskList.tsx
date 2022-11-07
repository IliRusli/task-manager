import { useState } from "react";
import { BaseTask, Task } from "../types/tasks";
import styled from "styled-components";
import EditableForm from "./EditableForm";
import { formatDate, formatDateString } from "../utils/date-helper";

const ContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const ButtonStyles = styled.button`
  background: cadetblue;
  color: white;
  width: 100%;
  height: 2rem;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkgrey;
  border-radius: 5px;
`;

const CardStyles = styled.div`
  background: mistyrose;
  border: 2px solid darkgrey;
  display: grid;
  grid-gap: 0.5rem;
  justify-items: start;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
`;

interface TaskListProps {
  tasks: Task[];
  onSave: (task: BaseTask, id?: string) => void;
}

interface TaskCardProps {
  task: Task;
  setSelectedId: (value: string) => void;
}

const TaskCard = (props: TaskCardProps) => {
  const { task, setSelectedId } = props;
  const { name, dueDate, description, status, createdAt, updatedAt, id } = task;
  return (
    <CardStyles>
      <span>Name: {name}</span>
      <span>Description: {description}</span>
      <span>Due Date: {formatDateString(dueDate)}</span>
      <span>Status: {status}</span>
      <span>Created At: {formatDateString(createdAt)}</span>
      <ButtonStyles onClick={() => setSelectedId(id)}>Edit</ButtonStyles>
    </CardStyles>
  );
};

const TaskList = (props: TaskListProps) => {
  const { tasks, onSave } = props;
  const [selectedId, setSelectedId] = useState("");

  const submitForm = (task: BaseTask, id?: string) => {
    setSelectedId("");
    onSave(task, id);
  };

  if (!tasks.length) {
    return <CardStyles>List is empty. Add more tasks to view list.</CardStyles>;
  }

  return tasks.map((task) => {
    return (
      <ContainerStyles key={task.id}>
        {selectedId !== task.id ? (
          <TaskCard task={task} setSelectedId={setSelectedId} />
        ) : (
          <EditableForm
            onSave={(task, id) => submitForm(task, id)}
            task={task}
          />
        )}
      </ContainerStyles>
    );
  });
};

export default TaskList;
