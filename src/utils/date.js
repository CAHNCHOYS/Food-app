export const dateFormat = (date) => {
  const splittedDate = date.split(",")[0].split(".");
  const dateToInsert =
    splittedDate[1] + "." + splittedDate[0] + "." + splittedDate[2];
  return dateToInsert;
};
