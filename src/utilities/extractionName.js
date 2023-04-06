export const getFirstName = (name) => {
  return name.split(" ").slice(0, -1).join(" ");
};

export const getLastName = (name) => {
  const arrayName = name.split(" ");
  return arrayName[arrayName.length - 1];
};
