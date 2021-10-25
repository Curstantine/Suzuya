interface MDURLS {
  md_url: string;
  md_api: string;
}

interface Credentials {
  email: string;
  password: string;
  username: string;
}

interface AuthCache {
  session: string;
  refresh: string;
  date: number;
}

export default class Config {
  credentials: Credentials;

  private urls: MDURLS;
  private authcache?: AuthCache;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
    this.urls = {
      md_url: "https://mangadex.org",
      md_api: "https://api.mangadex.org",
    };
  }

  public get MDUrl(): string {
    return this.urls.md_url;
  }
  public set MDUrl(url: string) {
    this.urls.md_url = url;
  }

  public get APIUrl(): string {
    return this.urls.md_api;
  }
  public set APIUrl(url: string) {
    this.urls.md_api = url;
  }

  public get AuthRes(): AuthCache {
    if (!this.authcache) throw new Error("You need to authenticate first.");
    return this.authcache;
  }
  public set AuthRes(authRes: AuthCache) {
    this.authcache = authRes;
  }
}
