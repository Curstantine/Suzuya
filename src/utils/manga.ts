import { URL, URLSearchParams } from "url";
import fetch from "node-fetch";
import uuid4 from "uuid4";
import Config from "../config";
import Auth from "./auth";

import {
  MangaCreateBody,
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

  /**
   * Create a new Manga. \
   * Requires Authorization. \
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
   * Requires Authorization. \
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
   * Requires Authorization \
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
   * Requires Authorization \
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
}
