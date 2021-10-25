import fetch from "node-fetch";
import Config from "../config";

import { ServerResponse } from "../interfaces/common";
import {
  ServerLoginResponse,
  ServerCheckResponse,
  ServerRefreshResponse,
} from "../interfaces/auth";

export default class Auth {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public async login() {
    const response = await fetch(`${this.config.APIUrl}/auth/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(this.config.credentials),
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerLoginResponse = await response.json();

    if (!data.errors && data.result === "ok") {
      this.config.AuthRes = {
        ...data.token!,
        date: Date.now(),
      };
    } else {
      data.errors!.forEach((error) => {
        throw new Error(`${error.title} - ${error.detail}`);
      });
    }
  }

  public async checkToken(): Promise<boolean> {
    const response = await fetch(`${this.config.APIUrl}/auth/check`, {
      headers: { Authorization: `Bearer ${this.config.AuthRes.session}` },
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${status}]`);
    const data: ServerCheckResponse = await response.json();

    if (data.result === "ok") {
      return data.isAuthenticated;
    } else {
      throw new Error("Unrecoverable Error");
    }
  }

  public async logout() {
    const response = await fetch(`${this.config.APIUrl}/auth/logout`, {
      headers: { Authorization: `Bearer ${this.config.AuthRes.session}` },
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerResponse = await response.json();

    if (data.result !== "ok") {
      throw new Error("Unrecoverable Error");
    }
  }

  public async refreshToken() {
    const response = await fetch(`${this.config.APIUrl}/auth/logout`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ token: this.config.AuthRes.refresh }),
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerRefreshResponse = await response.json();

    if (!data.errors && data.result === "ok") {
      this.config.AuthRes = {
        ...data.token!,
        date: Date.now(),
      };
    } else {
      data.errors!.forEach((error) => {
        throw new Error(`${error.title} - ${error.detail}`);
      });
    }
  }
}
