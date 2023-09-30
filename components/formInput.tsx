import React, { type ReactElement } from 'react';
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import type { FormInputProps } from '../types/interfaces';

const FormInput = (props: FormInputProps): ReactElement => {
  return (
    <FormControl isInvalid={props.isInvalid}>
      <Input
        type={props.type}
        InputLeftElement={props.InputLeftElement}
        InputRightElement={props.InputRightElement}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        onPressIn={props.onPressIn}
        isReadOnly={props.isReadOnly}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>} children={props.errorText}/>
    </FormControl>
  );
};

export default FormInput;
