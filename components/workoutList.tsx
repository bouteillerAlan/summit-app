import React, { type ReactElement, useEffect, useState } from 'react';
import { Text, ScrollView } from 'native-base';
import type { AxsCallError, workout, workoutListProps } from '../types/interfaces';
import Api from '../services/api';
import { RefreshControl } from 'react-native';
import { type AxiosResponse } from 'axios';
import ErrorMessage from './errorMessage';

const WorkoutList = (props: workoutListProps): ReactElement => {
  const [apiError, setApiError] = useState<AxsCallError>({ message: '', inError: false });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [workoutList, setWorkoutList] = useState<workout[] | undefined>(undefined);

  useEffect(() => {
    getWorkoutForThePressedDate();
  }, []);

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
    <ScrollView contentContainerStyle={{ paddingBottom: 125 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getWorkoutForThePressedDate} />}>
      <ErrorMessage condition={apiError.inError} text={apiError.message}/>
      {workoutList?.map((z) => (
        <Text>{JSON.stringify(z)}</Text>
      ))}
    </ScrollView>
  );
};

export default WorkoutList;
