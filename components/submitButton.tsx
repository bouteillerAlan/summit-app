import React, { type ReactElement } from 'react';
import { FormControl, WarningOutlineIcon } from 'native-base';
import type { SubmitButtonProps } from '../types/interfaces';
import CustomButton from './button';

const SubmitButton = (props: SubmitButtonProps): ReactElement => {
  return (
    <FormControl isInvalid={props.isInvalid}>
      <CustomButton
        text={props.text}
        loading={props.loading}
        onPress={props.onPress}
        disabled={props.isInvalid}
        error={props.isInvalid}
        success={props.isSucceed}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>} children={props.errorText}/>
    </FormControl>
  );
};

export default SubmitButton;
