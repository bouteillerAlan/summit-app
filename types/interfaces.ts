import { type DateTime } from 'luxon';
import { type ViewToken } from 'react-native';

export type Token = string | undefined;

export interface FormError {
  formError: string
}

export interface InputState {
  value: string
  onError: boolean
  errorMessage?: string
}

export interface LoginForm extends FormError {
  email: InputState
  password: InputState
}

export interface AuthCtx {
  signIn: (token: string, callbackError: () => void) => void
  signOut: (callbackError: () => void) => void
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
