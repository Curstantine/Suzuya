import Config from "./config";
import Auth from "./utils/auth/auth";
import Manga from "./utils/manga";
import Cover from "./utils/cover";

class Suzuya {
  auth: Auth;
  manga: Manga;
  cover: Cover;
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
    this.auth = new Auth(this.config);

    this.manga = new Manga(this.auth, this.config);
    this.cover = new Cover(this.auth, this.config);
  }
}
export { Suzuya, Config };
