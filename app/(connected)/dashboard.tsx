import React, { type ReactElement, useState } from 'react';
import RowCalendar from '../../components/row-calendar';
import { type dayData } from '../../types/interfaces';
import { Box, View } from 'native-base';
import { DateTime } from 'luxon';

const Dashboard = (): ReactElement => {
  // first load is today
  const [pressedDate, setPressedDate] = useState<dayData>({ date: DateTime.now(), isToday: true, isPressed: false });

  return (
    <View>
      <RowCalendar readUserPressedDate={(pressedDate: dayData): void => { setPressedDate(pressedDate); }}/>
      <Box>
        {JSON.stringify(pressedDate)}
      </Box>
    </View>
  );
};

export default Dashboard;
