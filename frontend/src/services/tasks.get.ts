import axios from "axios";
import { Task } from "../types/tasks";
import { BASE_URL } from "../utils/constants";

const getTasks = (): Promise<Task[]> => {
  const request = axios.get<Task[]>(BASE_URL);
  return request.then((response) => response.data);
};

export default getTasks;
