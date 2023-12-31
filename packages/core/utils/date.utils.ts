import { format, isDate, parse } from "date-fns";
export const DEFAULT_DATE_FORMAT = "dd/MM/yyyy";
export const DISPLAY_DATE_FORMAT = "dd MMM, yyyy";
export const DISPLAY_DATE_TIME_FORMAT = "dd MMM, yyyy hh:mm a";
export const API_DATE_FORMAT = "yyyy-MM-dd";

export class DateUtils {
  static getValue(date: any, format?: string) {
    if (!date || isDate(date)) return date;
    if (format) {
      return parse(date, format, new Date());
    }
    return new Date(date);
  }
  static apiDateFormat(date: any, dateFormat: any = API_DATE_FORMAT) {
    if (!date) return date;
    const dateData = this.getValue(date);
    return format(dateData, dateFormat);
  }

  static displayDate(date: any, isTimeShow?: boolean) {
    const dateValue = this.getValue(date);
    if (!dateValue) return;
    return format(
      dateValue,
      isTimeShow ? DISPLAY_DATE_TIME_FORMAT : DISPLAY_DATE_FORMAT
    );
  }
}
