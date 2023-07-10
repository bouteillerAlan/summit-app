import React, { type ReactElement } from 'react';
import { Button, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { type CustomButtonProps } from '../types/interfaces';

/**
 * render a custom button component
 * @param {CustomButtonProps} props settings for the button { text, loading, disabled, onPress }
 * @returns {ReactElement} the custom button
 */
const CustomButton = (props: CustomButtonProps): ReactElement => {
  let icon = <FontAwesome5 name='unlock-alt'/>;
  let color = 'black';

  if (props.loading) {
    icon = <FontAwesome5 name='sync-alt'/>;
  }

  if (props.disabled) {
    icon = <FontAwesome5 name='unlock-alt'/>;
    color = 'gray.500';
  }

  if (props.error) {
    icon = <FontAwesome5 name='times'/>;
    color = 'red.500';
  }

  if (props.success) {
    icon = <FontAwesome5 name='check'/>;
    color = 'green.500';
  }

  return <Button
    disabled={props.disabled}
    onPress={props.onPress}
    backgroundColor={color}
    leftIcon={
      <Icon
        size={5} mr='2' color='white'
        as={icon}
      />
    }
  >
    {props.text}
  </Button>;
};

export default CustomButton;
