import { core } from "../core/core";

export namespace persistence {
  interface KVRepository<T> {
    save: (type: T) => Promise<void>;
    count: () => Promise<number>;
  }

  export class ManualyticsEventRepository
    implements KVRepository<core.ManualyticsEvent>
  {
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
    manualyticsEventRepository: KVRepository<core.ManualyticsEvent>
  ) => Promise<void> = async (manualyticsEvent, manualyticsEventRepository) =>
    manualyticsEventRepository.save(manualyticsEvent);
}
