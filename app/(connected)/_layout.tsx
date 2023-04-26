import { Tabs } from 'expo-router';
import React, { type ReactElement } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

interface tabBarIconProps { focused: boolean, color: string, size: number }

const Layout = (): ReactElement => {
  const iconSize = 20;

  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#000'
    }}>
      <Tabs.Screen
        name='dashboard'
        options={{
          tabBarIcon: (stg: tabBarIconProps) => <FontAwesome5 name='chart-line' color={stg.color} size={iconSize}/>
        }}
      />
      <Tabs.Screen
        name='workouts/list'
        options={{
          tabBarIcon: (stg: tabBarIconProps) => <FontAwesome5 name='dumbbell' color={stg.color} size={iconSize}/>
        }}
      />
      <Tabs.Screen
        name='workouts/create'
        options={{
          tabBarIcon: (stg: tabBarIconProps) => <FontAwesome5 name='unlock-alt' color={stg.color} size={iconSize}/>
        }}
      />
    </Tabs>
  );
};

export default Layout;
