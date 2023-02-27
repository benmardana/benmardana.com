import { Request } from '../../types';

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
      await context.env.MESSAGE_REPO.delete(context.params.id);
    } else {
      throw new Error();
    }

    return new Response(null, { status: 200 });
  } catch {
    return new Response(null, { status: 500 });
  }
};
