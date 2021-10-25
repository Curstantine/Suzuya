import { ServerResponse, ServerError } from "./common";

export interface ServerLoginResponse extends ServerResponse {
  token?: {
    session: string;
    refresh: string;
  };
  errors?: ServerError[];
}

export interface ServerCheckResponse extends ServerResponse {
  result: "ok";
  isAuthenticated: boolean;
  roles: string[];
  permissions: string[];
}

export interface ServerRefreshResponse extends ServerLoginResponse {
  message?: string;
}
