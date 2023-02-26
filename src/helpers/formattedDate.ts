export const formattedDate = (date: string | undefined) => {
  if (!date) return;
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
    newDate
  );
};
