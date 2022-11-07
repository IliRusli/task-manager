export interface BaseTask {
  name: string;
  description: string;
  dueDate: Date;
}

export interface Task extends BaseTask {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
