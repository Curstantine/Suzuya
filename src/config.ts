interface MDURLS {
  MD_URL: string;
  MD_API_URL: string;
}

interface Credentials {
  email: string;
  password: string;
  username: string;
}

interface AuthRes {
  session: string;
  refresh: string;
  date: number;
}

export default class Config {
  credentials: Credentials;

  private urls: MDURLS;
  private authres?: AuthRes;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
    this.urls = {
      MD_URL: 'https://mangadex.org',
      MD_API_URL: 'https://api.mangadex.org',
    };
  }

  public get MDUrl(): string {
    return this.urls.MD_URL;
  }
  public set MDUrl(url: string) {
    this.urls.MD_URL = url;
  }

  public get APIUrl(): string {
    return this.urls.MD_API_URL;
  }
  public set APIUrl(url: string) {
    this.urls.MD_API_URL = url;
  }

  public get AuthRes(): AuthRes {
    if (!this.authres) throw new Error('You need to set AuthRes first');
    return this.authres;
  }
  public set AuthRes(authRes: AuthRes) {
    this.authres = authRes;
  }
}

//  MD_URL: 'https://mangadex.org', MD_API_URL: 'https://api.mangadex.org'
