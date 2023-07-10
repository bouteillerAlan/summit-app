import { FormDataValidation } from '../types/enum';
import { type InputState } from '../types/interfaces';

export default class FormValidation {
  private static instance: FormValidation;
  // regex compliant with RFC 5322 - https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
  private static readonly emailFormat = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

  /**
   * singleton handler
   * @returns {FormValidation} the single instance of `FormValidation`
   */
  public static getInstance(): FormValidation {
    if (typeof FormValidation.instance === 'undefined') FormValidation.instance = new FormValidation();
    return FormValidation.instance;
  }

  public validate<T extends Record<K, InputState<unknown>>, K extends PropertyKey>(formData: T, index: K): T {
    const validation = formData[index].validation;

    // index is a string in any case, but we need to check it out for avoiding dev error
    if (validation !== undefined && typeof index === 'string') {
      if (validation.includes(FormDataValidation.notEmpty) && formData[index].value === '') {
        const name = index.charAt(0).toUpperCase() + index.slice(1); // return the name of the field; e.g: Email
        formData[index].errorMessage = `${name} is mandatory.`;
        formData[index].onError = true;
      } else if (validation.includes(FormDataValidation.isEmail)) {
        // value is obviously string because we check an email, but we cast the right type for avoiding dev or type error
        const value: string = typeof formData[index].value === 'string' ? formData[index].value as string : '';
        if (value.match(FormValidation.emailFormat) == null) {
          formData[index].errorMessage = `${value} is not an email.`;
          formData[index].onError = true;
        }
      } else {
        formData[index].errorMessage = '';
        formData[index].onError = false;
      }
    }

    return formData;
  }
}
