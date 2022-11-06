import { Schema, model } from "mongoose";
import { TaskSchema } from "../types/task";
import { getTaskStatus } from "../utils/status-helper";

const taskSchema = new Schema<TaskSchema>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

taskSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.status = getTaskStatus(returnedObject.dueDate);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Task = model<TaskSchema>("User", taskSchema);
