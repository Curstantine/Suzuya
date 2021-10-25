import { URL, URLSearchParams } from 'url';
import fetch from 'node-fetch';
import uuid4 from 'uuid4';
import Config from '../config';
import Auth from './auth';

import { MangaQueryParameters } from '../interfaces/manga';

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
    const url = new URL(this.config.APIUrl);
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key]);
    });
    
    return url.toString();
  }

  public async viewManga(uuid: string) {
    if (!uuid4.valid(uuid)) throw new Error('Not a valid uuid');
  }
}
