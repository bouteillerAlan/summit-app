import React, { type ReactElement, useState } from 'react';
import RowCalendar from '../../../components/rowCalendar';
import { type dayData } from '../../../types/interfaces';
import { DateTime } from 'luxon';
import SafeView from '../../../components/safeView';
import WorkoutList from '../../../components/workoutList';

const Dashboard = (): ReactElement => {
  // first load is today
  const [pressedDate, setPressedDate] = useState<dayData>({ date: DateTime.now(), isToday: true, isPressed: false });

  return (
    <SafeView>
      <RowCalendar readUserPressedDate={(pressedDate: dayData): void => { setPressedDate(pressedDate); }}/>
      <WorkoutList dayData={pressedDate}/>
    </SafeView>
  );
};

export default Dashboard;
