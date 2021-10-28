import type { Error, Response } from "../../extra/common";

export interface LoginResponse extends Response {
  token?: {
    session: string;
    refresh: string;
  };
  errors?: Error[];
}

export interface CheckResponse extends Response {
  result: "ok";
  isAuthenticated: boolean;
  roles: string[];
  permissions: string[];
}

export interface RefreshResponse extends LoginResponse {
  message?: string;
}

export interface Credentials {
  email: string;
  password: string;
  username: string;
}

export interface AuthCache {
  session?: string;
  refresh: string;
  date?: number;
}
