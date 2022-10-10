import { core } from "../core/core";
import { persistence } from "../persistence/persistence";

export namespace api {
  type FormDataFields = {
    from?: string;
    message?: string;
    contact?: string;
  };

  export const onRequestGet: PagesFunction<
    { ManualyticsEventEnv: KVNamespace },
    never,
    FormDataFields
  > = async (context) => {
    try {
      const manualyticsEvent = await core.createManualyticsEvent(
        context.request
      );

      const KVRepo = new persistence.KVRepository(
        context.env.ManualyticsEventEnv
      );

      await persistence.saveManualyticsEvent(manualyticsEvent, KVRepo);

      const url = new URL(context.request.url);
      return Response.redirect(
        `${url.protocol}//${url.host}/thanks-for-stopping-by`,
        303
      );
    } catch (e) {
      console.log({ e });
      return new Response(undefined, {
        status: 500,
        statusText: e instanceof Error ? e.message : "Internal Server Error",
      });
    }
  };
}

export const onRequestGet = api.onRequestGet;
