import { IncomingMessage, ServerResponse } from 'http';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { setupTestRunner } from '@keystone-6/core/testing';
import supertest from 'supertest';
import { allowAll } from '@keystone-6/core/access';
import { apiTestConfig } from './utils';

const runner = setupTestRunner({
  config: apiTestConfig({
    lists: { User: list({ fields: { name: text() }, access: allowAll }) },
    server: {
      extendHttpServer: server => {
        server.prependListener('request', (req: IncomingMessage, res: ServerResponse) => {
          res.setHeader('test-header', 'test-header-value');
        });
      },
    },
  }),
});

test(
  'server extension',
  runner(async ({ server }) => {
    await supertest(server).get('/anything').expect('test-header', 'test-header-value');
  })
);
