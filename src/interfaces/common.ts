export interface ServerResponse {
  result: 'ok' | 'error';
}

export interface ServerError {
  id: string;
  status: number;
  title: string;
  detail: string;
}
