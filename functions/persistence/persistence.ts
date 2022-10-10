import { core } from "../core/core";

export namespace persistence {
  interface ManualticsEventRepository {
    save: (manualyticsEvent: core.ManualyticsEvent) => Promise<void>;
    count: () => Promise<number>;
  }

  export class KVRepository implements ManualticsEventRepository {
    namespace: KVNamespace;

    constructor(namespace: KVNamespace) {
      this.namespace = namespace;
    }

    async save(manualyticsEvent: core.ManualyticsEvent) {
      const unixEpochTimeUTC = Math.floor(Date.now() / 1000);
      await this.namespace.put(
        unixEpochTimeUTC.toString(),
        JSON.stringify(manualyticsEvent)
      );
    }

    async count() {
      return (await this.namespace.list()).keys.length;
    }
  }

  export const saveManualyticsEvent: (
    manualyticsEvent: core.ManualyticsEvent,
    manualyticsEventRepository: ManualticsEventRepository
  ) => Promise<void> = async (manualyticsEvent, manualyticsEventRepository) =>
    manualyticsEventRepository.save(manualyticsEvent);
}
