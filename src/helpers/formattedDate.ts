export const formattedDate = (date: string | undefined): string | null => {
  if (!date) return null;
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
    newDate
  );
};
