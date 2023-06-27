import React, { type ReactElement, useEffect, useState } from 'react';
import { ScrollView, VStack } from 'native-base';
import type { AxsCallError, workout, workoutListProps } from '../types/interfaces';
import Api from '../services/api';
import { RefreshControl } from 'react-native';
import { type AxiosResponse } from 'axios';
import ErrorMessage from './errorMessage';
import NoDataMessage from './noDataMessage';
import WorkoutCard from './workoutCard';

const WorkoutList = (props: workoutListProps): ReactElement => {
  const [apiError, setApiError] = useState<AxsCallError>({ message: '', inError: false });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [workoutList, setWorkoutList] = useState<workout[] | []>([]);

  useEffect(() => {
    getWorkoutForThePressedDate();
  }, [props.dayData]);

  /**
   * fetch the list of all the user workout for the pressed day (props.dayData.date)
   * @returns {void} set workoutList state
   */
  function getWorkoutForThePressedDate(): void {
    setRefreshing(true);
    setApiError({ message: '', inError: false });
    Api.getInstance().getDayWorkout(props.dayData.date)
      .then((response: AxiosResponse): void => { setWorkoutList(response.data); })
      .catch((): void => { setApiError({ message: 'sorry an error occurred, try to refresh', inError: true }); })
      .finally((): void => { setRefreshing(false); });
  }

  return (
    // the paddingBottom value is unfortunately a magick number because I don't have a clue on how to make this ScrollView not going below the bottom navbar
    // https://stackoverflow.com/questions/76509830/how-to-prevent-the-view-from-passing-under-the-navigation-expo-tabbar
    <ScrollView contentContainerStyle={{ paddingBottom: 135, paddingRight: 10, paddingLeft: 10, paddingTop: 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getWorkoutForThePressedDate} />}>
      <ErrorMessage condition={apiError.inError} text={apiError.message}/>
      <NoDataMessage condition={workoutList.length === 0} text={'No workout'}/>
      <VStack space={4} alignItems={'center'}>
        {workoutList.map((workout: workout) => <WorkoutCard key={workout.id} workout={workout}/>)}
      </VStack>
    </ScrollView>
  );
};

export default WorkoutList;
