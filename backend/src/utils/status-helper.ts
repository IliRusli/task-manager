import { TaskStatus } from "../types/task";

const getTimeDifference = (dueDate: string): number => {
  const currentDateTime = new Date(new Date().toDateString()).getTime();
  const dueDateTime = new Date(dueDate).getTime();

  return currentDateTime - dueDateTime;
};

const getDayDifference = (dueDate: string): number => {
  const dayInMs = 1000 * 60 * 60 * 24;
  return getTimeDifference(dueDate) / dayInMs;
};

export const getTaskStatus = (dueDate: string): string => {
  const timeDifference = getTimeDifference(dueDate);
  const dayDifference = getDayDifference(dueDate);

  if (timeDifference > 0) {
    return TaskStatus.OVERDUE;
  }

  if (Math.abs(dayDifference) <= 7) {
    return TaskStatus.DUE_SOON;
  }

  return TaskStatus.NOT_URGENT;
};
