export default class Config {
  protected readonly urls: {
    md_url: string;
    md_api: string;
  };

  constructor() {
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
}
