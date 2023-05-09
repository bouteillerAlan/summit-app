import React, { Fragment, type ReactElement, useEffect, useState } from 'react';
import { Box, Center, FlatList, HStack } from 'native-base';
import DateServ from '../services/date';
import { DateTime } from 'luxon';
import { Dimensions, type ListRenderItemInfo, type ScaledSize } from 'react-native';

const RowCalendar = (): ReactElement => {
  const windowDimensions: ScaledSize = Dimensions.get('window');
  const [dayItemWidth, setDayItemWidth] = useState<number>(0);
  const [dateData, setDateData] = useState<DateTime[][] | undefined>(undefined);
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
   * find the current date sub array into DateTime[][]
   * @param {DateTime[][]} dateArray data array
   * @returns {number} the index of the current week
   */
  function getTodayIndex (dateArray: DateTime[][]): number {
    return dateArray.findIndex(
      (item: DateTime[]): boolean => {
        // if the sub object check doesn't return -1 the object contain the today date
        return item.findIndex((subItem: DateTime): boolean => {
          // if the sub object is today return the index, if not return -1
          return subItem.toLocaleString(DateTime.DATE_SHORT) === DateTime.now().toLocaleString(DateTime.DATE_SHORT);
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
   * @returns {DateTime[][]} array of array of luxon DateTime, each sub array is a week
   */
  function getCurrentMonth (): DateTime[][] {
    const now: DateTime = DateTime.now();
    return DateServ.getInstance().getDaysInMonthSplitByWeek(now.month, now.year);
  }

  /**
   * render the component for the day row for the flatlist
   * @param {DateTime[]} week array luxon DateTime
   * @returns {ReactElement[]}  the Element itself
   */
  function dayComponent(week: DateTime[]): ReactElement[] {
    return week.map((value: DateTime, index: number) => {
      return (
        <Center key={value.toString()} h={'10'} w={dayItemWidth} bg={`primary.${index + 1}00`}>
          {value.day}
        </Center>
      );
    });
  }

  return (
    <Box>
      <HStack justifyContent='center'>
        {generateCurrentWeek()}
      </HStack>
      {(dateData !== undefined) && <FlatList
        horizontal={true}
        snapToAlignment={'start'}
        snapToInterval={windowDimensions.width}
        decelerationRate={'fast'} // better feedback for the user, the ui stop on the next/previous week and not later
        data={dateData}
        initialScrollIndex={todayIndex}
        getItemLayout={(data: DateTime[][] | null | undefined, index: number): { length: number, offset: number, index: number } => ({
          length: windowDimensions.width, offset: windowDimensions.width * index, index
        })}
        keyExtractor={(item: DateTime[]) => item.toString()}
        // for some reason the type accept only ReactElement and not ReactElement[] so I put the return into this ugly Fragment
        renderItem={(week: ListRenderItemInfo<DateTime[]>) => <Fragment>{dayComponent(week.item)}</Fragment>}
      />}
    </Box>
  );
};

export default RowCalendar;
