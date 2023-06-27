import React, { Fragment, type ReactElement } from 'react';
import { Center, Text } from 'native-base';
import { type NoDataMessageProps } from '../types/interfaces';

const NoDataMessage = (props: NoDataMessageProps): ReactElement => {
  if (props.condition) return <Center paddingTop={15}><Text color={'gray.500'}>{props.text}</Text></Center>;
  return <Fragment/>;
};

export default NoDataMessage;
