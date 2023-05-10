import React, { Fragment, type ReactElement, useEffect, useState } from 'react';
import { Box, Center, FlatList, HStack } from 'native-base';
import DateServ from '../services/date';
import { DateTime } from 'luxon';
import {
  Dimensions,
  type ListRenderItemInfo,
  type NativeScrollEvent, type NativeScrollPoint,
  type NativeSyntheticEvent,
  type ScaledSize
} from 'react-native';
import type { calendarData, dayData, weekData } from '../types/interfaces';

const RowCalendar = (): ReactElement => {
  const windowDimensions: ScaledSize = Dimensions.get('window');
  const [dayItemWidth, setDayItemWidth] = useState<number>(0);
  const [dateData, setDateData] = useState<calendarData | undefined>(undefined);
  const [todayIndex, setTodayIndex] = useState<number>(0);

  /**
   * calculate the item dimension for one day, we want the total width split by seven day
   * load up the data for the date when the user arrived to this screen
   */
  useEffect((): void => {
    setDayItemWidth(windowDimensions.width / 7);
    setDateData(getCurrentMonth());
  }, []);

  /**
   * calculate today index and set it up
   */
  useEffect((): void => {
    if (dateData !== undefined) setTodayIndex(getTodayIndex(dateData));
  }, [dateData]);

  /**
   * find the current date sub array into `calendarData`
   * @param {calendarData} dateArray date array
   * @returns {number} the index of the current week
   */
  function getTodayIndex (dateArray: calendarData): number {
    return dateArray.findIndex(
      (item: weekData): boolean => {
        // if the sub object check doesn't return -1 the object contain the today date
        return item.findIndex((subItem: dayData): boolean => {
          return subItem.isToday;
        }) !== -1;
      });
  }

  /**
   * render the week day
   * @returns {ReactElement} the Element itself
   */
  function generateCurrentWeek(): ReactElement[] {
    return ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((value: string, index: number) => {
      return (
        <Center key={index} h={'10'} w={'14.28%'} bg={'primary.500'}>
          {value}
        </Center>
      );
    });
  }

  /**
   * get an array of date for the current month split by week
   * @returns {calendarData} array of array of luxon DateTime, each sub array is a week
   */
  function getCurrentMonth(): calendarData {
    const now: DateTime = DateTime.now();
    return DateServ.getInstance().getDaysInMonthSplitByWeek(now.month, now.year);
  }

  /**
   * render the component for the day row for the `flatlist`
   * @param {weekData} week array luxon DateTime
   * @returns {ReactElement[]}  the Element itself
   */
  function dayComponent(week: weekData): ReactElement[] {
    return week.map((value: dayData, index: number) => {
      return (
        <Center
          key={value.date.toString()} h={'10'} w={dayItemWidth}
          bg={value.isToday ? 'red.200' : `primary.${index + 1}00`}
        >
          {value.date.day}
        </Center>
      );
    });
  }

  /**
   * check if the user is at the start of the scroll list and fetch data if so
   * @param {NativeSyntheticEvent<NativeScrollEvent>} event scroll event
   * @returns {void}
   */
  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
    // if distanceFromStart.x === 0 we reach the start of the list
    const distanceFromStart: NativeScrollPoint = event.nativeEvent.contentOffset;
    if (distanceFromStart.x === 0) prependData();
  }

  /**
   * prepend data to `dateData`
   * @returns {void}
   */
  function prependData(): void {
    console.log('prepend');
  }

  /**
   * append data to `dateData`
   * @returns {void}
   */
  function appendData(): void {
    console.log('append');

    if (dateData === undefined) return;
    // here I assume that the last week is completed (see `getDaysInMonthSplitByWeek` function)
    const lastDate: dayData = dateData[dateData?.length - 1][6];
    // we want 4 more weeks
    for (let i = 1; i < 4; i++) {
      // todo
    }
  }

  return (
    <Box>
      <HStack justifyContent='center'>
        {generateCurrentWeek()}
      </HStack>
      {(dateData !== undefined) && <FlatList
        horizontal={true}
        snapToAlignment={'start'}
        snapToInterval={windowDimensions.width} // set the swap on the whole elem, like so the user switch week by week
        decelerationRate={'fast'} // better feedback for the user, the ui stop on the next/previous week and not later
        data={dateData}
        initialScrollIndex={todayIndex}
        // `getItemLayout` is needed by `initialScrollIndex` to work
        getItemLayout={(data: calendarData | null | undefined, index: number): { length: number, offset: number, index: number } => ({
          length: windowDimensions.width, offset: windowDimensions.width * index, index
        })}
        keyExtractor={(item: weekData, index: number): string => index.toString()}
        // for some reason the type accept only ReactElement and not ReactElement[] so I put the return into this ugly `Fragment`
        renderItem={(week: ListRenderItemInfo<weekData>): ReactElement => <Fragment>{dayComponent(week.item)}</Fragment>}
        // use `onScroll` to handle the data when the user reach the start
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>): void => { handleScroll(event); }}
        onEndReachedThreshold={0.5}
        onEndReached={(): void => { appendData(); }}
      />}
    </Box>
  );
};

export default RowCalendar;
