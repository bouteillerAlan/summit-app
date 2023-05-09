import { type DateTime } from 'luxon';

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
  trainingData?: undefined // todo
}

export type weekData = dayData[]

export type calendarData = weekData[]
