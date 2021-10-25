import { URL, URLSearchParams } from "url";
import fetch from "node-fetch";
import uuid4 from "uuid4";
import Config from "../config";
import Auth from "./auth";

import {
  MangaCreateBody,
  MangaFeedParameters,
  MangaQueryParameters,
  MangaUpdateBody,
  ServerMangaVolumeResponse,
} from "../interfaces/manga";
import {
  ServerCollectionResponse,
  ServerEntityResponse,
  ServerResponse,
  UUID,
} from "../interfaces/common";

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
      } else {
        url.searchParams.append(key, currentParam);
      }
    });

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);

    const data: ServerCollectionResponse<"manga"> = await response.json();
    return data;
  }

  /**
   * Create a new Manga. \
   * Requires Authentication. \
   * Docs: https://api.mangadex.org/docs.html#operation/post-manga
   */
  public async createManga(body: MangaCreateBody) {
    const response = await fetch(`${this.config.APIUrl}/manga`, {
      headers: {
        "Content-Type": "application/json",
        Authorizations: `Bearer ${this.config.AuthRes.session}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerEntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * Docs: https://api.mangadex.org/docs.html#tag/Manga/paths/~1manga~1{id}~1aggregate/get
   */
  public async getMangaVolumes(uuid: UUID) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid UUID.");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}/aggregate`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerMangaVolumeResponse = await response.json();

    return data;
  }

  /**
   * View Manga. \
   * Docs: https://api.mangadex.org/docs.html#operation/get-manga-id
   */
  public async viewManga(uuid: UUID) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid UUID.");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerEntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * Requires Authentication. \
   * Docs: https://api.mangadex.org/docs.html#operation/put-manga-id
   */
  public async updateManga(uuid: UUID, body: MangaUpdateBody) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid UUID.");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.AuthRes.session}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerEntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * Requires Authentication \
   * Docs: https://api.mangadex.org/docs.html#operation/delete-manga-id
   */
  public async deleteManga(uuid: UUID) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid UUID.");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.AuthRes.session}`,
      },
      method: "DEL",
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerResponse = await response.json();

    return data;
  }

  /**
   * Requires Authentication \
   * Docs: https://api.mangadex.org/docs.html#operation/delete-manga-id-follow
   */
  public async unfollowManga(uuid: UUID) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid UUID.");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}/follow`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.AuthRes.session}`,
      },
      method: "DEL",
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerResponse = await response.json();

    return data;
  }

  /**
   * Requires Authentication \
   * Docs: https://api.mangadex.org/docs.html#operation/post-manga-id-follow
   */
  public async followManga(uuid: UUID) {
    if (!uuid4.valid(uuid)) throw new Error("Not a valid UUID.");

    const response = await fetch(`${this.config.APIUrl}/manga/${uuid}/follow`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.AuthRes.session}`,
      },
      method: "POST",
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerResponse = await response.json();

    return data;
  }

  /**
   * Docs: https://api.mangadex.org/docs.html#operation/get-manga-id-feed
   */
  public async mangaFeed(uuid: UUID, params: MangaFeedParameters) {
    const url = new URL(`${this.config.APIUrl}/manga/${uuid}/feed`);
    Object.keys(params).forEach((key) => {
      const currentParam = params[key];

      if (currentParam instanceof Array) {
        currentParam.forEach((paramElem) => {
          url.searchParams.append(key, paramElem);
        });
      } else {
        url.searchParams.append(key, currentParam);
      }
    });

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);

    const data: ServerCollectionResponse<"chapter"> = await response.json();
    return data;
  }

  /**
   * Docs: https://api.mangadex.org/docs.html#operation/get-manga-random
   */
  public async getRandomManga(includes?: string[]) {
    const url = new URL(`${this.config.APIUrl}/manga/random`);

    if (includes) {
      includes.forEach((paramElem) => {
        url.searchParams.append("includes[]", paramElem);
      });
    }

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);

    const data: ServerEntityResponse<"manga"> = await response.json();
    return data;
  }

  /**
   * Docs: https://api.mangadex.org/docs.html#operation/get-manga-tag
   */
  public async tagList() {
    const response = await fetch(`${this.config.APIUrl}/manga/tag`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status > 200) throw new Error(`${response.statusText} [${response.status}]`);
    const data: ServerCollectionResponse<"tag"> = await response.json();

    return data;
  }
}
