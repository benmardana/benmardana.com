import { Request } from '../../types';
import { handleDeleteMail } from '../../handlers/mailbox';
import { errorResponse, extractAuthToken } from '../../lib';

export const onRequestDelete: Request = async (context) => {
  try {
    if (extractAuthToken(context.request.headers) !== context.env.AUTH_KEY) {
      return new Response(null, {
        status: 401,
        headers: {
          [`WWW-Authenticate`]: 'Basic',
        },
      });
    }

    if (typeof context.params.id === 'string') {
      await handleDeleteMail(context.env.MAILBOX_REPO, context.params.id);
    } else {
      return errorResponse();
    }

    return new Response(null, { status: 200 });
  } catch (e) {
    return errorResponse(e);
  }
};
