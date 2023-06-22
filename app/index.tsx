import React, { type ReactElement, useState } from 'react';
import { Center, FormControl, Icon, Input, Pressable, VStack, WarningOutlineIcon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import Api from '../services/api';
import { SubmitButton } from '../components/button';
import { type AxiosResponse } from 'axios';
import { useAuth } from '../services/auth';
import { type AuthCtx, type LoginForm } from '../types/interfaces';
import { FormDataValidation } from '../types/enum';

const Index = (): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginForm>(
    { password: { value: '', onError: false }, email: { value: '', onError: false }, formError: '' }
  );

  const auth: AuthCtx | null = useAuth();

  /**
   * handle the data assignation and the data check for the form
   * @param {Exclude<keyof LoginForm, "formError">} index index for the value assignment
   * @param {string} value the value you want to assign to the index
   * @param {FormDataValidation[]} validation the test you want to apply for the current value
   * todo - setup a service for that or something like that
   */
  function handleFormData(index: Exclude<keyof LoginForm, 'formError'>, value: string, validation?: FormDataValidation[] | undefined): void {
    setError(false);
    const currentFormData = formData;
    currentFormData[index].value = value;

    // todo - move the test on another function
    if (validation !== undefined) {
      // regex compliant with RFC 5322 - https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
      const emailFormat = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

      if (validation.includes(FormDataValidation.notEmpty) && currentFormData[index].value === '') {
        const name = index.charAt(0).toUpperCase() + index.slice(1);
        currentFormData[index].errorMessage = `${name} is mandatory.`;
        currentFormData[index].onError = true;
      } else if (validation.includes(FormDataValidation.isEmail) && currentFormData[index].value.match(emailFormat) == null) {
        currentFormData[index].errorMessage = `${currentFormData[index].value} is not an email.`;
        currentFormData[index].onError = true;
      } else {
        currentFormData[index].errorMessage = '';
        currentFormData[index].onError = false;
      }
    }

    setFormData({ ...currentFormData });
  }

  /**
   * set state to trigger "unexpected error"
   * @returns {void}
   */
  function castUnexpectedError(): void {
    setError(true);
    setSuccess(false);
    setFormData({ ...formData, formError: 'something unexpected happened !' });
  }

  /**
   * try a login for the current data
   * @returns {void}
   */
  function login(): void {
    setLoading(true);
    Api.getInstance().login(formData.email.value, formData.password.value)
      .then((response: AxiosResponse): void => {
        if (response.data?.access_token !== undefined && auth !== null) {
          setSuccess(true);
          auth.signIn(response.data.access_token, castUnexpectedError);
        } else {
          castUnexpectedError();
        }
      })
      .catch((): void => {
        setError(true);
        setFormData({ ...formData, formError: 'check your credential' });
      })
      .finally(() => { setLoading(false); });
  }

  return (
    <Center flex={1} px='10'>
      <VStack w={'xs'} space={4} alignItems='center'>
        <FormControl isInvalid={formData.email.onError}>
          <Input
            type='text'
            InputLeftElement={<Icon as={<FontAwesome5 name='user-alt'/>} size={5} ml='2' color='muted.400'/>}
            placeholder='email'
            value={formData.email.value}
            onChangeText={(value: string) => { handleFormData('email', value, [FormDataValidation.notEmpty, FormDataValidation.isEmail]); }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
            {formData.email.errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={formData.password.onError}>
          <Input
            type={show ? 'text' : 'password'}
            secureTextEntry={!show}
            InputLeftElement={<Icon as={<FontAwesome5 name='lock'/>} size={5} ml='2' color='muted.400'/>}
            InputRightElement={<Pressable onPress={() => { setShow(!show); }}>
              <Icon as={<FontAwesome5 name={show ? 'eye' : 'eye-slash'}/>} size={5} mr='2' color='muted.400'/>
            </Pressable>}
            id='password'
            placeholder='password'
            value={formData.password.value}
            onChangeText={(value: string) => { handleFormData('password', value, [FormDataValidation.notEmpty]); }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
            {formData.password.errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={error}>
          <SubmitButton text={'Login'} loading={loading} onPress={login} disabled={error} error={error} success={success}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
            {formData.formError}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </Center>
  );
};

export default Index;
