import { Request } from "../../types";
import { errorResponse, extractAuthToken, parseFormData } from "../../lib";
import { handleListMail, handleSaveMail } from "../../handlers/mailbox";

export const onRequestPost: Request = async (context) => {
  try {
    const origin = new URL(context.request.url).origin;

    const { from, message, contact } = parseFormData(
      await context.request.formData(),
      ["from", "message", "contact"]
    );

    if (!from) {
      return Response.redirect(origin, 303);
    }

    await handleSaveMail(context.env.MAILBOX_REPO, {
      from,
      message,
      contact,
    });

    return Response.redirect(`${origin}/thanks-for-stopping-by`, 303);
  } catch (e) {
    return errorResponse(e);
  }
};

export const onRequestGet: Request = async (context) => {
  try {
    if (extractAuthToken(context.request.headers) !== context.env.AUTH_KEY) {
      return new Response(null, {
        status: 401,
        headers: {
          [`WWW-Authenticate`]: "Basic",
        },
      });
    }

    const data = await handleListMail(context.env.MAILBOX_REPO);

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
};
