import { type DateTime } from 'luxon';
import { type ViewToken } from 'react-native';
import { type feelingEnum, type FormDataValidation, type perceivedExertionEnum } from './enum';
import { type ReactElement } from 'react';

export type Token = string | undefined;

export interface AxsCallError {
  message: string
  inError: boolean
}

export interface FormError {
  formError: string
}

export interface InputState<T> {
  value: T
  onError: boolean
  validation: FormDataValidation[] | undefined
  errorMessage?: string
}

export interface LoginForm extends FormError {
  email: InputState<string>
  password: InputState<string>
}

export interface AuthCtx {
  signIn: (token: string, callbackError: () => void) => void
  signOut: (callbackError: () => void) => void
}

export interface WorkoutForm extends FormError {
  trainingType: InputState<trainingType>
  name: InputState<string>
  date: InputState<string>
  plannedDistance?: InputState<number>
  plannedDuration?: InputState<number>
  plannedPace?: InputState<number>
  plannedCalorie?: InputState<number>
  distance?: InputState<number>
  duration?: InputState<number>
  pace?: InputState<number>
  calorie?: InputState<number>
  note?: InputState<string>
  postActivityNote?: InputState<string>
  perceivedExertion?: InputState<perceivedExertionEnum>
  feeling?: InputState<feelingEnum>
}

export interface dayData {
  date: DateTime
  isToday: boolean
  isPressed: boolean // only for certain case, when the day is a button or a pressable
  trainingData?: undefined // todo
}

export type weekData = dayData[]

export type calendarData = weekData[]

export interface onViewableItemsChangedInfo {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export interface pressedDayCoordinate {
  weekIndex: number
  dayIndex: number
}

export interface RowCalendarProps {
  readUserPressedDate: (dayData: dayData) => void
}

export interface tabBarIconProps { focused: boolean, color: string, size: number }

export interface workoutListProps { dayData: dayData }

export interface workoutCardProps {
  workout: workout
}

export interface trainingType {
  id: number
  name: string
  icon: string
  code: string
}

export interface workout {
  id: number
  owner: number
  trainingType: trainingType
  name: string
  date: string
  plannedDistance?: number
  plannedDuration?: number
  plannedPace?: number
  plannedCalorie?: number
  distance?: number
  duration?: number
  pace?: number
  calorie?: number
  note?: string
  postActivityNote?: string
  perceivedExertion?: perceivedExertionEnum
  feeling?: feelingEnum
}

export interface ErrorMessageProps {
  condition: boolean
  text: string
}

export interface NoDataMessageProps extends ErrorMessageProps {}

export interface FormInputProps {
  type: 'text' | 'password'
  isInvalid: boolean
  errorText: string | undefined
  InputLeftElement?: ReactElement | ReactElement[] | undefined
  InputRightElement?: ReactElement | ReactElement[] | undefined
  placeholder: string
  value: string | undefined
  onChangeText: (value: string) => void
  secureTextEntry?: boolean
  id?: string
}

export interface SubmitButtonProps {
  isInvalid: boolean
  isSucceed: boolean
  errorText: string | undefined
  loading: boolean
  onPress: () => void
  text: string
}

export interface CustomButtonProps {
  text: string
  loading: boolean
  disabled: boolean
  error: boolean
  success: boolean
  onPress: () => void
}
