import { useEffect, useState } from "react";
import styled from "styled-components";
import { BaseTask } from "./types/tasks";
import EditableForm from "./components/EditableForm";
import getTasks from "./services/tasks.get";
import TaskList from "./components/TaskList";
import { createTask } from "./services";
import Notification from "./components/Notification";
import updateTask from "./services/task.put";

const ContainerStyles = styled.div`
  padding: 2rem 12rem;
  align-items: start;
  background-color: white;
`;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const getTaskList = async () => {
    const response = await getTasks().catch((error) => {
      handleNotification(error.response.data.error, "error");
    });

    if (response) {
      setTasks(response);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const handleNotification = (message: string, type: "success" | "error") => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const saveTask = async (task: BaseTask) => {
    const response = await createTask(task).catch((error) => {
      handleNotification(
        `Unable to create task: ${error.response.data.error}`,
        "error"
      );
    });

    if (response) {
      await getTaskList();
      handleNotification(
        `Created task ${response.name} successfully!`,
        "success"
      );
    }
  };

  const editTask = async (task: BaseTask, id: string) => {
    const response = await updateTask(id, task).catch((error) => {
      handleNotification(
        `Unable to update task: ${error.response.data.error}`,
        "error"
      );
    });

    if (response) {
      await getTaskList();
      handleNotification(
        `Updated task ${response.name} successfully!`,
        "success"
      );
    }
  };

  const handleFormSubmit = async (
    task: BaseTask,
    id?: string
  ): Promise<void> => {
    if (!id) {
      await saveTask(task);
      return;
    }

    await editTask(task, id);
  };

  return (
    <ContainerStyles>
      <h2>Task management application</h2>
      <Notification message={message} type={messageType} />
      <h3>Create a task</h3>
      <EditableForm onSave={handleFormSubmit} />
      <h3>Task List</h3>
      <TaskList tasks={tasks} onSave={handleFormSubmit} />
    </ContainerStyles>
  );
};

export default App;
