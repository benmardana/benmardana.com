import { repository } from '../../persistence';
import { MiddlewareContext } from '../../types';

export async function onRequest(context: MiddlewareContext) {
  try {
    context.env.MESSAGE_REPO = repository(context.env.ManualyticsEventEnv);
    return await context.next();
  } catch (err) {
    // @ts-ignore
    return new Response(err.message, { status: 500 });
  }
}
