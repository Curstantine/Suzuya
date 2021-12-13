import type { Error, Response } from "../../types/common";

export interface LoginResponse extends Response {
  token?: {
    session: string;
    refresh: string;
  };
  errors?: Error[];
}

type PermType =
  | "manga"
  | "chapter"
  | "author"
  | "scanlation_group"
  | "cover"
  | "user"
  | "manga_relation";
type PermSelf = "view" | "list";

/**
 * **Experimental**
 *
 * This type doesn't have all the types that the server could
 * respond with.
 */
type Permission = `${PermType}.${PermSelf}`;
/**
 * **Experimental**
 *
 * This type doesn't have all the types that the server could
 * respond with.
 */
type Role = "ROLE_GUEST" | "IS_ANONYMOUS" | "IS_AUTHENTICATED_ANONYMOUSLY";

export interface CheckResponse extends Response {
  result: "ok";
  isAuthenticated: boolean;
  roles: Role[];
  permissions: Permission[];
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
