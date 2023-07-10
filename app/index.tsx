import React, { type ReactElement, useState } from 'react';
import { Icon, Pressable } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import Api from '../services/api';
import { type AxiosResponse } from 'axios';
import { useAuth } from '../services/auth';
import { type AuthCtx, type LoginForm } from '../types/interfaces';
import { FormDataValidation } from '../types/enum';
import FormView from '../components/formView';
import FormInput from '../components/formInput';
import FormValidation from '../services/formValidation';
import SubmitButton from '../components/submitButton';

const Index = (): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginForm>({
    password: { value: 'j22aa1555', onError: false, validation: [FormDataValidation.notEmpty] },
    email: { value: 'alan@alan.fr', onError: false, validation: [FormDataValidation.notEmpty, FormDataValidation.isEmail] },
    formError: ''
  });

  const auth: AuthCtx | null = useAuth();

  /**
   * handle the data assignation and the data check for the form
   * @param {Exclude<keyof LoginForm, "formError">} index index for the value assignment
   * @param {string} value the value you want to assign to the index
   */
  function handleFormData(index: Exclude<keyof LoginForm, 'formError'>, value: string): void {
    setError(false);
    const currentFormData = formData;
    currentFormData[index].value = value;
    const validatedData = FormValidation.getInstance().validate(currentFormData, index);
    setFormData({ ...validatedData });
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
    <FormView>
      <FormInput
        type={'text'}
        InputLeftElement={<Icon as={<FontAwesome5 name='user-alt'/>} size={5} ml='2' color='muted.400'/>}
        value={formData.email.value}
        placeholder={'email'}
        isInvalid={formData.email.onError}
        errorText={formData.email.errorMessage}
        onChangeText={(value: string) => { handleFormData('email', value); }}
      />
      <FormInput
        isInvalid={formData.password.onError}
        errorText={formData.password.errorMessage}
        type={show ? 'text' : 'password'}
        secureTextEntry={!show}
        InputLeftElement={<Icon as={<FontAwesome5 name='lock'/>} size={5} ml='2' color='muted.400'/>}
        InputRightElement={<Pressable onPress={() => { setShow(!show); }}>
          <Icon as={<FontAwesome5 name={show ? 'eye' : 'eye-slash'}/>} size={5} mr='2' color='muted.400'/>
        </Pressable>}
        id='password'
        placeholder='password'
        value={formData.password.value}
        onChangeText={(value: string) => { handleFormData('password', value); }}
      />
      <SubmitButton
        text={'Login'}
        errorText={formData.formError}
        onPress={login}
        loading={loading}
        isInvalid={error}
        isSucceed={success}
      />
    </FormView>
  );
};

export default Index;
