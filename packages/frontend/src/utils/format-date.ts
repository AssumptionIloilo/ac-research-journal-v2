import dayjs from "dayjs";

/** Our standard way to format date e.g. April 14, 2001 */
export function formatDate(date?: dayjs.ConfigType) {
  return dayjs(date).format("MMMM D, YYYY");
}
