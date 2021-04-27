export const customSubstring = (str: string, len: number): string => {
  return str.length > len ? str.substring(0, len - 3) + "..." : str;
};
