import { Document } from "mongoose";

export interface TaskSchema extends Document {
  name: string;
  description: string;
  dueDate: string;
}

export interface TaskDBSchema extends TaskSchema {
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export enum TaskStatus {
  OVERDUE = "Overdue",
  NOT_URGENT = "Not urgent",
  DUE_SOON = "Due soon",
}
