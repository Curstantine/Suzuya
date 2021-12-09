import { URL } from "url";
import fetch from "node-fetch";
import { uuid } from "../../common";
import Config from "../../config";
import Auth from "../auth/auth";
import Helper from "../../types/helper";

import type {
  MangaCreateBody,
  MangaDraftParameters,
  MangaDraftSubmitBody,
  MangaFeedParameters,
  MangaQueryParameters,
  MangaRelationCreateBody,
  MangaStatusesResponse,
  MangaStatusResponse,
  MangaUpdateBody,
  MangaVolumeResponse,
} from "./types";
import type { MangaStatus } from "../../types/enums";
import type { CollectionResponse, EntityResponse, Response } from "../../types/common";

export default class Manga {
  private readonly auth: Auth;
  private readonly config: Config;

  constructor(auth: Auth, config: Config) {
    this.auth = auth;
    this.config = config;
  }

  /**
   * Search a list of Manga.
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-search-manga)
   */
  public async listManga(params: MangaQueryParameters) {
    const url = new URL(`${this.config.APIUrl}/manga`);
    Helper.parseAndSet(url.searchParams, params);

    const response = await fetch(url);
    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);

    const data: CollectionResponse<"manga"> = await response.json();
    return data;
  }

  /**
   * Create a new Manga.
   *
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/post-manga)
   */
  public async createManga(body: MangaCreateBody) {
    const url = new URL(`${this.config.APIUrl}/manga`);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorizations: `Bearer ${this.auth.Cache.session}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#tag/Manga/paths/~1manga~1{id}~1aggregate/get)
   */
  public async getMangaVolumes(mangaId: string) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/aggregate`);
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: MangaVolumeResponse = await response.json();

    return data;
  }

  /**
   * View Manga.
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-id)
   */
  public async viewManga(mangaId: string) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}`);
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/put-manga-id)
   */
  public async updateManga(mangaId: string, body: MangaUpdateBody) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * This can be used for both drafts and manga.
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/delete-manga-id)
   */
  public async deleteManga(mangaId: string) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "DELETE",
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: Response = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/delete-manga-id-follow)
   */
  public async unfollowManga(mangaId: string) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/follow`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "DELETE",
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: Response = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/post-manga-id-follow)
   */
  public async followManga(mangaId: string) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/follow`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "POST",
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: Response = await response.json();

    return data;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-id-feed)
   */
  public async mangaFeed(mangaId: string, params: MangaFeedParameters) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/feed`);
    Helper.parseAndSet(url.searchParams, params);

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);

    const data: CollectionResponse<"chapter"> = await response.json();
    return data;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-random)
   */
  public async getRandomManga(includes?: string[]) {
    const url = new URL(`${this.config.APIUrl}/manga/random`);
    Helper.parseAndSet(url.searchParams, includes, "includes[]");

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);

    const data: EntityResponse<"manga"> = await response.json();
    return data;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-tag)
   */
  public async tagList() {
    const url = new URL(`${this.config.APIUrl}/manga/tag`);
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: CollectionResponse<"tag"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-status)
   */
  public async getAllReadingStatus(status?: MangaStatus) {
    const url = new URL(`${this.config.APIUrl}/manga/status`);
    Helper.parseAndSet(url.searchParams, status, "status");

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: MangaStatusesResponse = await response.json();

    return data;
  }

  /**
   * Requires Authentication
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-id-status)
   */
  public async getReadingStatus(mangaId: string) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/status`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: MangaStatusResponse = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/post-manga-id-status)
   */
  public async updateReadingStatus(mangaId: string, status: MangaStatus) {
    if (!uuid.valid(mangaId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/status`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "POST",
      body: JSON.stringify({ status: status }),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: Response = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-id-draft)
   */
  public async getMangaDraft(draftId: string) {
    if (!uuid.valid(draftId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/draft/${uuid}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * Note: A Manga Draft that is to be submitted must have at least one cover,
   * must be in the "draft" state and must be passed the correct version in the request body.
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/commit-manga-draft)
   */
  public async submitMangaDraft(draftId: string, body: MangaDraftSubmitBody) {
    if (!uuid.valid(draftId)) throw new Error("Not a valid UUID.");

    const url = new URL(`${this.config.APIUrl}/manga/draft/${draftId}/commit`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-drafts)
   */
  public async listMangaDrafts(params: MangaDraftParameters) {
    const url = new URL(`${this.config.APIUrl}/manga/draft`);
    Helper.parseAndSet(url.searchParams, params);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga"> = await response.json();

    return data;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-manga-relation)
   */
  public async getMangaRelationList(mangaId: string) {
    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/relation`);
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: CollectionResponse<"manga_relation"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/post-manga-relation)
   */
  public async createMangaRelation(mangaId: string, body: MangaRelationCreateBody) {
    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/relation`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: EntityResponse<"manga_relation"> = await response.json();

    return data;
  }

  /**
   * **Requires authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/delete-manga-relation-id)
   *
   * @param mangaId Manga uuid this manga relation belongs to.
   * @param relationId Manga relation relationId
   */
  public async deleteMangaRelation(mangaId: string, relationId: string) {
    const url = new URL(`${this.config.APIUrl}/manga/${mangaId}/relation/${relationId}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.auth.Cache.session}`,
      },
      method: "DELETE",
    });

    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);
    const data: Response = await response.json();

    return data;
  }
}
