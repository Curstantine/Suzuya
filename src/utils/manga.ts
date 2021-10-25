import { URL, URLSearchParams } from "url";
import fetch from "node-fetch";
import uuid4 from "uuid4";
import Config from "../config";
import Auth from "./auth";

import { MangaCreateBody, MangaQueryParameters } from "../interfaces/manga";
import { ServerCollectionResponse, ServerEntityResponse } from "../interfaces/common";

export default class Manga {
  private auth: Auth;
  private config: Config;

  constructor(auth: Auth, config: Config) {
    this.auth = auth;
    this.config = config;
  }

  /**
   * Search a list of Manga. \
   * Docs: https://api.mangadex.org/docs.html#operation/get-search-manga
   */
  public async listManga(params: MangaQueryParameters) {
    const url = new URL(`${this.config.APIUrl}/manga`);
    Object.keys(params).forEach((key) => {
      const currentParam = params[key];

      if (currentParam instanceof Array) {
        currentParam.forEach((paramElem) => {
          url.searchParams.append(key, paramElem);
        });
      } else if (typeof currentParam === "object") {
        url.searchParams.append(key, JSON.stringify(currentParam));
      } else {
        url.searchParams.append(key, currentParam);
      }
    });

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);

    const data: ServerCollectionResponse<"manga"> = await response.json();
    return data;
  }

  public async createManga(body: MangaCreateBody) {
    const response = await fetch(`${this.config.APIUrl}/manga`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerEntityResponse<"manga"> = await response.json();

    return data;
  }

  public async viewManga(uuid: string) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid uuid");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerEntityResponse<"manga"> = await response.json();

    return data;
  }
}
