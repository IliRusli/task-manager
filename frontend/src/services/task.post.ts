import axios from "axios";
import { BaseTask, Task } from "../types/tasks";
import { BASE_URL } from "../utils/constants";

export const createTask = (task: BaseTask): Promise<Task> => {
  const request = axios.post(BASE_URL, task);
  return request.then((response) => response.data);
};

export default createTask;
