import { ResponseResult } from './common';

export interface Error {
  id: string,
  status: number,
  title: string,
  detail: string
}

export type ErrorResponse = {
  type: ResponseResult.error,
  errors: Error[]
}