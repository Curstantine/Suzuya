import Config from './config';
import Auth from './utils/auth';

class Suzuya {
  private config: Config;
  private auth: Auth;

  constructor(config: Config) {
    this.config = config;
    this.auth = new Auth(this.config);
  }
}

export { Suzuya, Config };
