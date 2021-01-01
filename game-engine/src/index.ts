import 'module-alias/register';
import app from '~/app';

import { createSocketIoServer } from '~/socket';
import { createServer as createHttpServer } from 'http';
import { connect } from '@codeblitz/data';

(async () => {
  await connect();
  const httpServer = createHttpServer(app);
  const socketioServer = createSocketIoServer(httpServer);

  httpServer.listen(6942, () => {
    console.log('Listening on https://localhost:6942');
  });
})();
