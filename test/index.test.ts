import { Suzuya, Config } from '../src/index';
import { LangCodes } from '../src/interfaces/locales';

const config = new Config({ email: '', password: '', username: '' });
const suzu = new Suzuya(config);

(async () => {
  const response = await suzu.manga.listManga({
    order: {
      createdAt: 'desc',
    },
  });

  response.data.forEach((res) => {
    console.log(res);
  });
  // const response = await suzu.manga.viewManga('f9c33607-9180-4ba6-b85c-e4b5faee7192');
})();
