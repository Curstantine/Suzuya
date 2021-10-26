import Config from "./config";
import Auth from "./utils/auth/auth";
import Manga from "./utils/manga";

class Suzuya {
  private readonly config: Config;
  auth: Auth;
  manga: Manga;

  constructor(config: Config) {
    this.config = config;
    this.auth = new Auth(this.config);

    this.manga = new Manga(this.auth, this.config);
  }
}

export { Suzuya, Config };
