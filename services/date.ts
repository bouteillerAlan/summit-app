import { DateTime, type PossibleDaysInMonth } from 'luxon';

export default class DateServ {
  private static instance: DateServ;

  /**
   * singleton handler
   * @returns {DateServ} the single instance of `DateServ`
   */
  public static getInstance(): DateServ {
    if (typeof DateServ.instance === 'undefined') DateServ.instance = new DateServ();
    return DateServ.instance;
  }

  /**
   * generate an array containing all the day for a given month and year
   * @param {number} month the month number, 0 based
   * @param {number} year the year, not zero based, required to account for leap years
   * @returns {Date[]} list with date objects for each day of the month
   */
  public getDaysInMonth(month: number, year: number): DateTime[] {
    const date: DateTime = DateTime.local(year, month);
    const daysInMonth: PossibleDaysInMonth | undefined = date.daysInMonth; // e.g 30 in number format

    // return an array containing dateTime object
    return Array.from(Array(daysInMonth), (_, x: number) => {
      return DateTime.local(year, month, x + 1);
    });
  }

  /**
   * generate an array containing all the day for a given month and year split by week
   * @param {number} month the month number, 0 based
   * @param {number} year the year, not zero based, required to account for leap years
   * @returns {DateTime[][]} list with date objects for each day of the month
   */
  public getDaysInMonthSplitByWeek(month: number, year: number): DateTime[][] {
    const dayInMonth: DateTime[] = this.getDaysInMonth(month, year);
    const result: DateTime[][] = [];
    let tempArray: DateTime[] = [];
    dayInMonth.reduce((previousValue: DateTime, currentValue: DateTime, currentIndex: number) => {
      tempArray.push(currentValue);
      if (currentValue.day === 7 || currentValue.day === 14 || currentValue.day === 21 || currentValue.day === 28 || currentIndex === dayInMonth.length - 1) {
        // end of week or end of month
        result.push(tempArray);
        tempArray = [];
      }
      return currentValue;
    }, dayInMonth[0]);
    return result;
  }
}
