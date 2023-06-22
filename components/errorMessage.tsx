import React, { Fragment, type ReactElement } from 'react';
import { Center, Text } from 'native-base';
import { type ErrorMessageProps } from '../types/interfaces';

const ErrorMessage = (props: ErrorMessageProps): ReactElement => {
  if (props.condition) return <Center bg={'red.500'} paddingBottom={5} paddingTop={5}><Text color={'white'}>{props.text}</Text></Center>;
  return <Fragment/>;
};

export default ErrorMessage;
