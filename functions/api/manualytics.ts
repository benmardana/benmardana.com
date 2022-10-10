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

      return new Response("ok");
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
