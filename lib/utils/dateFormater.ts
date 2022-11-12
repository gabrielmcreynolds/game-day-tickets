export const dateFormatter = (date: Date): string => {
  const monthArr = months.split(" ");
  return `${monthArr[date.getMonth()]} ${date.getDate()}`;
};

const months =
  "January February March April May June July August September October November December";
