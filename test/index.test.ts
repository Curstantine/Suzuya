import { Suzuya, Config } from '../src/index';

const config = new Config({ email: '', password: '', username: '' });
const suzu = new Suzuya(config);

(async () => {
  console.log(await suzu.manga.listManga({ title: 'lmao', 'ids[]': ['lmao', 'lmfao'] }));
})();
