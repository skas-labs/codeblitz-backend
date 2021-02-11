import 'module-alias/register';

import app from '~/app';
import { createSocketIoServer } from '~/socket';
import DatabaseService from '~/services/database';
import { createServer as createHttpServer } from 'http';

(async () => {
  await DatabaseService.initialize();

  const httpServer = createHttpServer(app);
  const socketioServer = createSocketIoServer(httpServer);

  httpServer.listen(6942, () => {
    console.log('Listening on https://localhost:6942');
  });
})();
