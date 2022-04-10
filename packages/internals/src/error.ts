import { ResponseStatus } from './common';

export interface Error {
  id: string,
  status: number,
  title: string,
  detail: string
}

export type ErrorResponse = {
  type: ResponseStatus.error,
  errors: Error[]
}