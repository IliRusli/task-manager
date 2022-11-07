export const formatDateString = (date: string | Date): string => {
  return new Date(date).toDateString();
};
