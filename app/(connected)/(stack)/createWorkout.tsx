import React, { type ReactElement, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import type { dayData, WorkoutForm } from '../../../types/interfaces';
import FormView from '../../../components/formView';
import FormInput from '../../../components/formInput';
import { FormDataValidation } from '../../../types/enum';

const CreateWorkout = (): ReactElement => {
  const localSearchParams: Partial<{ d: string }> = useLocalSearchParams<{ d: string }>();
  const [formData, setFormData] = useState<WorkoutForm>({
    trainingType: { value: '', onError: false, validation: [FormDataValidation.notEmpty] },
    name: { value: 'my training', onError: false, validation: [FormDataValidation.notEmpty] },
    date: { value: '', onError: false, validation: [FormDataValidation.notEmpty] },
    formError: ''
  });

  /**
   * read the query parameter 'd' from the url and transform it into a json if the param is not undefined
   * @returns {dayData | undefined} dayData or undefined in function of the 'd' param
   */
  function rebuildDayDataJson(): dayData | undefined {
    if (localSearchParams.d !== undefined) {
      return JSON.parse(localSearchParams.d);
    }
    return undefined;
  }

  return (
    <FormView>
      <FormInput type={'text'} isInvalid={true} placeholder={'workout name'} value={''} errorText={'oups'} onChangeText={() => { /**/ }}/>
    </FormView>
  );
};

export default CreateWorkout;
