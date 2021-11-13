import fetch from "node-fetch";
import { URL } from "url";
import FormData from "form-data";
import type Auth from "../auth/auth";
import type Config from "../../config";
import Helper from "../../extra/helper";

export default class Chapter {
  private readonly auth: Auth;
  private readonly config: Config;

  constructor(auth: Auth, config: Config) {
    this.auth = auth;
    this.config = config;
  }

  public async chapterList() {}
}
