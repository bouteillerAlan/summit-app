import { DateTime, type PossibleDaysInMonth } from 'luxon';
import type { calendarData, weekData } from '../types/interfaces';

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
   * SET `isToday` FOR THE RIGHT DATE
   * @param {number} month the month number, 0 based
   * @param {number} year the year, not zero based, required to account for leap years
   * @returns {calendarData} list with date objects for each day of the month
   */
  public getDaysInMonthSplitByWeek(month: number, year: number): calendarData {
    const dayInMonth: DateTime[] = this.getDaysInMonth(month, year);
    const result: calendarData = [];
    let tempArray: weekData = [];
    // create the data for the current month
    dayInMonth.reduce((previousValue: DateTime, currentValue: DateTime, currentIndex: number) => {
      // compare two string without the hours
      const isToday: boolean = currentValue.toLocaleString(DateTime.DATE_SHORT) === DateTime.local().toLocaleString(DateTime.DATE_SHORT);
      tempArray.push({ date: currentValue, isToday });
      if (currentValue.weekday === 7 || currentIndex === dayInMonth.length - 1) { // sunday or end of the current month
        result.push(tempArray);
        tempArray = [];
      }
      return currentValue;
    }, dayInMonth[0]);

    // todo create a function for that
    // if the first week is less than 7 day add the previous month days
    if (result[0].length < 7) {
      const numberOfMissingDay: number = 7 - result[0].length;
      let m = month - 1; // in most case we want the previous month
      let y = year; // for the current year

      if (month === 1) { // if the current month is january
        m = 12;
        y = year - 1;
      }

      const numberOfDayInThePreviousMonth = DateTime.local(y, m).daysInMonth;

      if (numberOfDayInThePreviousMonth !== undefined) {
        for (let i: number = 0; i < numberOfMissingDay; i++) {
          result[0] = [{
            date: DateTime.local(y, m, numberOfDayInThePreviousMonth - i),
            isToday: false
          }, ...result[0]];
        }
      }
    }

    // todo create a function for that
    // if the last week is less than 7 day add the next month days
    const lastElem = result.length - 1;
    if (result[lastElem].length < 7) {
      const numberOfMissingDay: number = 7 - result[lastElem].length;
      let m = month + 1; // in most case we want the next month
      let y = year; // for the current year

      if (month === 12) { //  if the current month is december
        m = 1;
        y = year + 1;
      }

      for (let i: number = 0; i < numberOfMissingDay; i++) {
        result[lastElem] = [...result[lastElem], {
          date: DateTime.local(y, m, 1 + i),
          isToday: false
        }];
      }
    }

    return result;
  }
}
