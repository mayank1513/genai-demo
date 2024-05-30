export const toKebabCase = (str: String): String =>
  str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ +/g, "-");
