import React, { type ReactElement } from 'react';
import { Center, VStack } from 'native-base';

const FormView = (props: { children: ReactElement | ReactElement[] }): ReactElement => {
  return (
    <Center flex={1} px='10'>
      <VStack w={'xs'} space={4} alignItems='center'>
        {props.children}
      </VStack>
    </Center>
  );
};

export default FormView;
