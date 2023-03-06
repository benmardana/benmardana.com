import { MiddlewareRequest } from '../../types';
import { makeRepository } from '../../persistence';

const repositories = [{ name: 'MAILBOX_REPO', key: 'mailbox' }];

const addRepositories: MiddlewareRequest = async (context) => {
  try {
    repositories.forEach(({ name, key }) => {
      // @ts-ignore
      context.env[name] = makeRepository(context.env[key]);
    });

    return await context.next();
  } catch (e) {
    return new Response(
      e instanceof Error ? e.message : 'Internal Server Error',
      {
        status: 500,
        statusText: e instanceof Error ? e.message : 'Internal Server Error',
      }
    );
  }
};

export const onRequest = [addRepositories];
