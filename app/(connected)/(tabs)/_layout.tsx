import { Tabs } from 'expo-router';
import React, { type ReactElement } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import type { tabBarIconProps } from '../../../types/interfaces';

const Layout = (): ReactElement => {
  const iconSize = 20;

  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#000'
    }}>
      <Tabs.Screen
        name='dashboard'
        options={{
          tabBarStyle: { height: 50 },
          headerShown: false,
          tabBarIcon: (stg: tabBarIconProps) => <FontAwesome5 name='dumbbell' color={stg.color} size={iconSize}/>
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          tabBarIcon: (stg: tabBarIconProps) => <FontAwesome5 name='chart-line' color={stg.color} size={iconSize}/>
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarIcon: (stg: tabBarIconProps) => <FontAwesome5 name='cog' color={stg.color} size={iconSize}/>
        }}
      />
    </Tabs>
  );
};

export default Layout;
