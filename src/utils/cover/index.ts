import fetch from "node-fetch";
import { URL } from "url";
import FormData from "form-data";
import Auth from "../auth/auth";
import Config from "../../config";
import Helper from "../../extra/helper";
import { CoverQueryParameters, CoverUploadBody } from "./types";
import { CollectionResponse, EntityResponse } from "../../extra/common";

export default class Cover {
  private readonly auth: Auth;
  private readonly config: Config;

  constructor(auth: Auth, config: Config) {
    this.auth = auth;
    this.config = config;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-cover)
   */
  public async listCoverArt(params: CoverQueryParameters) {
    const url = new URL(`${this.config.APIUrl}/cover`);
    Helper.parseAndSet(url.searchParams, params);

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);

    const data: CollectionResponse<"cover_art"> = await response.json();
    return data;
  }

  /**
   * **Requires Authentication**
   *
   * [Documentation](https://api.mangadex.org/docs.html#operation/upload-cover)
   */
  public async uploadCoverArt(mangaId: string, body: CoverUploadBody) {
    const url = new URL(`${this.config.APIUrl}/cover/${mangaId}`);
    const formData = new FormData();
    Helper.parseAndSet(formData, body);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorizations: `Bearer ${this.auth.Cache.session}`,
      },
      method: "POST",
      body: formData,
    });
    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);

    const data: EntityResponse<"cover_art"> = await response.json();
    return data;
  }

  /**
   * [Documentation](https://api.mangadex.org/docs.html#operation/get-cover-id)
   */
  public async getCoverArt(coverId: string, includes?: string[]) {
    const url = new URL(`${this.config.APIUrl}/cover/${coverId}`);
    Helper.parseAndSet(url.searchParams, includes, "includes[]");

    const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
    if (response.status >= 400) throw new Error(`${response.statusText} [${response.status}]`);

    const data: EntityResponse<"cover_art"> = await response.json();
    return data;
  }
}
