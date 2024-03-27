export const isObjectId = (id: string) => {
  // Check if the parameter value is a 24-character hexadecimal string
  return /^[0-9a-fA-F]{24}$/.test(id);
};
