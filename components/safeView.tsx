import React, { type ReactElement, type ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

/**
 * custom safeAreaView working on android and ios
 * because the original safeAreaView works only on IOS +11 (https://reactnative.dev/docs/safeareaview)
 * @param {{children: ReactNode}} props props for the component
 * @param {ReactNode} props.children children element
 * @returns {ReactElement} children wrapped into the custom SafeView
 */
const SafeView = (props: { children: ReactNode }): ReactElement => {
  const STATUSBAR_HEIGHT: number = Constants.statusBarHeight;

  return (
    <SafeAreaView style={{ paddingTop: STATUSBAR_HEIGHT }}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeView;
