import axios from "axios";
import { BaseTask, Task } from "../types/tasks";
import { BASE_URL } from "../utils/constants";

const updateTask = (id: string, task: Partial<BaseTask>): Promise<Task> => {
  const request = axios.put(`${BASE_URL}/${id}`, task);
  return request.then((response) => response.data);
};

export default updateTask;
