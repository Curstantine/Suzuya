import fetch from "node-fetch";
import Config from "../../config";

import type { Response } from "../../extra/common";
import type {
  AuthCache,
  CheckResponse,
  Credentials,
  LoginResponse,
  RefreshResponse,
} from "./types";

export default class Auth {
  private readonly config: Config;
  private credentials?: Credentials;
  private cache?: AuthCache;

  constructor(config: Config) {
    this.config = config;
  }

  public get Credentials(): Credentials {
    if (!this.credentials) throw new Error("You need to set credentials first!");
    return this.credentials;
  }

  public set Credentials(credentials: Credentials) {
    this.credentials = credentials;
  }

  public get Cache(): AuthCache {
    if (!this.cache) throw new Error("You need to authenticate first.");
    return this.cache;
  }

  public set Cache(cache: AuthCache) {
    this.cache = {
      date: cache.date ?? 0,
      session: cache.session ?? "",
      refresh: cache.refresh,
    };
  }

  public async login() {
    const response = await fetch(`${this.config.APIUrl}/auth/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(this.credentials),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: LoginResponse = await response.json();

    if (data.errors) {
      data.errors.forEach((error) => {
        throw new Error(`${error.title} - ${error.detail}`);
      });
    }

    this.Cache = {
      ...data.token!,
      date: Date.now(),
    };

    return this.Cache;
  }

  public async checkToken() {
    const response = await fetch(`${this.config.APIUrl}/auth/check`, {
      headers: { Authorization: `Bearer ${this.Cache.session}` },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: CheckResponse = await response.json();

    if (data.result !== "ok") {
      throw new Error("Unrecoverable Error");
    }

    return data;
  }

  public async logout() {
    const response = await fetch(`${this.config.APIUrl}/auth/logout`, {
      headers: { Authorization: `Bearer ${this.Cache.session}` },
      method: "POST",
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: Response = await response.json();

    if (data.result !== "ok") {
      throw new Error("Unrecoverable Error");
    }
  }

  public async refreshToken() {
    const response = await fetch(`${this.config.APIUrl}/auth/refresh`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ token: this.Cache.refresh }),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: RefreshResponse = await response.json();

    if (data.errors) {
      data.errors.forEach((error) => {
        throw new Error(`${error.title} - ${error.detail}`);
      });
    }

    this.Cache = {
      ...data.token!,
      date: Date.now(),
    };

    return this.Cache;
  }
}