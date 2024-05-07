export const capitalizeWords = (str) => {
  return str
    .split("")
    .map((char) => char.toUpperCase())
    .join("");
};
