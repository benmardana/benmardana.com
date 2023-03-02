import { Request } from '../../types';
import { handleDeleteManualytics } from '../../handlers/manualytics';
import { errorResponse } from '../../lib';

export const onRequestDelete: Request = async (context) => {
  try {
    const auth = context.request.headers.get('authorization')?.split(' ')[1];

    if (auth !== context.env.AUTH_KEY) {
      return new Response(null, {
        status: 401,
        headers: {
          [`WWW-Authenticate`]: 'Basic',
        },
      });
    }

    if (typeof context.params.id === 'string') {
      await handleDeleteManualytics(
        context.env.MESSAGE_REPO,
        context.params.id
      );
    } else {
      return errorResponse();
    }

    return new Response(null, { status: 200 });
  } catch (e) {
    return errorResponse(e);
  }
};
