import React, { type ReactElement, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import type { dayData, WorkoutForm } from '../../../types/interfaces';
import FormView from '../../../components/formView';
import FormInput from '../../../components/formInput';
import { FormDataValidation } from '../../../types/enum';
import FormValidation from '../../../services/formValidation';
import { Calendar, DateData } from 'react-native-calendars';
import { Icon, Modal, Pressable } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

const CreateWorkout = (): ReactElement => {
  const localSearchParams: Partial<{ d: string }> = useLocalSearchParams<{ d: string }>();3
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [formData, setFormData] = useState<WorkoutForm>({
    trainingType: { value: { id: 0, name: 'test', icon: 'test', code: 'TES' }, onError: false, validation: [FormDataValidation.notEmpty] },
    name: { value: 'my training', onError: false, validation: [FormDataValidation.notEmpty] },
    date: { value: '', onError: false, validation: [FormDataValidation.notEmpty] },
    plannedDistance: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    plannedDuration: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    plannedPace: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    plannedCalorie: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    distance: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    duration: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    pace: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    calorie: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    note: { value: '', onError: false, validation: [FormDataValidation.notEmpty] },
    postActivityNote: { value: '', onError: false, validation: [FormDataValidation.notEmpty] },
    perceivedExertion: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    feeling: { value: 0, onError: false, validation: [FormDataValidation.notEmpty] },
    formError: ''
  });

  /**
   * get the current date from the previous page and store it into the form object
   */
  useEffect(() => {
    const currentDate = rebuildDayDataJson();
    if (currentDate !== undefined) {
      const currentFormData = formData;
      // clean the date and stock it (from "2023-09-30T00:00:00.000 02:00" to "2023-09-30")
      currentFormData.date.value = currentDate.date.toString().split('T')[0];
      setFormData({ ...currentFormData });
    }
  }, [localSearchParams.d]);

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

  /**
   * handle the data assignation and the data check for the form
   * @param {Exclude<keyof LoginForm, "formError">} index index for the value assignment
   * @param {string} value the value you want to assign to the index
   */
  function handleFormData(index: Exclude<keyof WorkoutForm, 'formError'>, value: string): void {
    setError(false);
    const currentFormData = formData;
    currentFormData[index].value = value;
    const validatedData = FormValidation.getInstance().validate(currentFormData, index);
    setFormData({ ...validatedData });
  }

  return (
    <FormView>
      <FormInput
        type={'text'}
        placeholder={'workout name'}
        isInvalid={formData.name.onError}
        value={formData.name.value}
        errorText={formData.name.errorMessage}
        onChangeText={(value: string) => { handleFormData('name', value); }}
      />

      <Pressable onPress={() => setShowDateModal(true)} w={'100%'}>
        <FormInput
          type={'text'}
          placeholder={formData.date.value}
          isInvalid={formData.date.onError}
          value={formData.date.value}
          errorText={formData.date.errorMessage}
          InputRightElement={<Icon as={<FontAwesome5 name='calendar'/>} size={5} mr='2' color='muted.400'/>}
          onChangeText={(value: string) => {}}
          isReadOnly={true}
        />
      </Pressable>

      <Modal isOpen={showDateModal} onClose={() => setShowDateModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Choose a date</Modal.Header>
          <Modal.Body>
            <Calendar
              onDayPress={(day: DateData) => { handleFormData('date', day.dateString) }}
              current={formData.date.value}
              markedDates={{
                [formData.date.value]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
              }}
            />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </FormView>
  );
};

export default CreateWorkout;
