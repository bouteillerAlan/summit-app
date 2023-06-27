import React, { type ReactElement } from 'react';
import { Box, HStack, Text, VStack } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import type { workout, workoutCardProps } from '../types/interfaces';
import { DateTime } from 'luxon';

const WorkoutCard = (props: workoutCardProps): ReactElement => {
  /**
   * slice workout name if the length pass 24 and add 3 dot at the end, either return the original value
   * @param {string} workoutName the string you want to be processed
   * @returns {string} the original or the modified value
   */
  function generateWorkoutName(workoutName: string): string {
    if (workoutName.length > 24) return workoutName.slice(0, 25) + '...';
    return workoutName;
  }

  /**
   * generate the status of the workout in function of the data
   * @param {workout} workout the workout data
   * @returns {'Planned' | 'Completed' | 'Skipped'} the status of the workout
   */
  function generateWorkoutStatus(workout: workout): 'Planned' | 'Completed' | 'Skipped' {
    if (workout.duration !== null || workout.distance !== null || workout.calorie !== null || workout.pace !== null) return 'Completed';
    const now: DateTime = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const workoutDate: DateTime = DateTime.fromISO(workout.date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    if (workoutDate.toMillis() >= now.toMillis()) return 'Planned';
    return 'Skipped';
  }

  return (
    <Box bgColor={'white'} shadow={3} rounded={'sm'} w={'100%'} h={20} p={2}>
      <VStack flex={1} justifyContent={'space-between'}>
        <HStack justifyContent={'space-between'}>
          <HStack>
            <FontAwesome5 name={props.workout.trainingType.icon} size={20}/>
            <Text ml={2}>{generateWorkoutName(props.workout.name)}</Text>
          </HStack>
          <Box w={20}>
            <Text textAlign={'right'}>{generateWorkoutStatus(props.workout)}</Text>
          </Box>
        </HStack>
        <HStack>
          {(props.workout.duration !== null) && <Text>{props.workout.duration}</Text>}
          {(props.workout.distance !== null) && <Text> - {props.workout.distance}</Text>}
          {(props.workout.pace !== null) && <Text> - {props.workout.pace}</Text>}
        </HStack>
      </VStack>
    </Box>
  );
};

export default WorkoutCard;
