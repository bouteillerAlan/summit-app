import React, { type ReactElement } from 'react';
import { Button, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

export interface SubmitButtonProps {
  text: string
  loading: boolean
  disabled: boolean
  error: boolean
  success: boolean
  onPress: () => void
}

/**
 * render a custom button component
 * @param {SubmitButtonProps} props settings for the button { text, loading, disabled, onPress }
 * @returns {ReactElement} the custom button
 */
export function SubmitButton(props: SubmitButtonProps): ReactElement {
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
        size={5} mr='2' color='muted.400'
        as={icon}
      />
    }
  >
    {props.text}
  </Button>;
}
