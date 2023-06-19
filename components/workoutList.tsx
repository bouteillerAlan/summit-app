import React, { type ReactElement } from 'react';
import { Text, ScrollView } from 'native-base';
import type { workoutListProps } from '../types/interfaces';

const WorkoutList = (props: workoutListProps): ReactElement => {
  return (
    <ScrollView bg={'red.300'} contentContainerStyle={{ flexGrow: 1 }}>
      <Text>The start</Text>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
        <Text>{props.dayData.date.toString()}</Text>
      ))}
      <Text>The end</Text>
    </ScrollView>
  );
};

export default WorkoutList;
