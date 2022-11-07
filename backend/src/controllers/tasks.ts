import { Task } from "../models/task";
import { Error } from "../types/error";
import express from "express";
export const taskRouter = express.Router();

// GET task list
taskRouter.get("/", (_request, response) => {
  Task.find({})
    .sort({ updatedAt: -1 })
    .then((tasks) => {
      response.json(tasks);
    });
});

// POST task
taskRouter.post("/", (request, response, next) => {
  const body = request.body;

  const task = new Task({
    name: body.name,
    description: body.description,
    dueDate: body.dueDate,
  });

  task
    .save()
    .then((savedTask) => savedTask.toJSON())
    .then((savedAndFormattedTask) => {
      response.json(savedAndFormattedTask);
    })
    .catch((error: Error) => next(error));
});

// PUT task
taskRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  Task.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedTask) => {
      response.json(updatedTask);
    })
    .catch((error: Error) => next(error));
});
