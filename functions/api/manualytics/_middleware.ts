import { MiddlewareRequest } from '../../types';
import { repository } from '../../persistence';

const repositories: MiddlewareRequest = async (context) => {
  try {
    context.env.MESSAGE_REPO = repository(context.env.ManualyticsEventEnv);
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

export const onRequest = [repositories];
