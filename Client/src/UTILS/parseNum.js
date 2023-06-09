export const extractNumFromString = (str = "") => {
  if (str.includes(",") || str.includes(".")) {
    return parseFloat(str.replace("NGN", "").replace(",", ""));
  }

  return parseFloat(str.replace(/^\D+/g, ""));
};
