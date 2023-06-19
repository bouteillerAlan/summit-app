import React, { type ReactElement, useState } from 'react';
import RowCalendar from '../../../components/row-calendar';
import { type dayData } from '../../../types/interfaces';
import { View, Text } from 'native-base';
import { DateTime } from 'luxon';
import SafeView from '../../../components/safeView';

const Dashboard = (): ReactElement => {
  // first load is today
  const [pressedDate, setPressedDate] = useState<dayData>({ date: DateTime.now(), isToday: true, isPressed: false });

  return (
    <SafeView>
      <RowCalendar readUserPressedDate={(pressedDate: dayData): void => { setPressedDate(pressedDate); }}/>
      <View>
        <Text>
          {JSON.stringify(pressedDate)}
        </Text>
      </View>
    </SafeView>
  );
};

export default Dashboard;
