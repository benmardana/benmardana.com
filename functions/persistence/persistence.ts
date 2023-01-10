import { core } from '../core/core';

export namespace persistence {
  interface Repository<T> {
    save: (type: T) => Promise<void>;
  }

  export class ManualyticsEventRepository
    implements Repository<core.ManualyticsEvent>
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
  }

  export const saveManualyticsEvent: (
    manualyticsEvent: core.ManualyticsEvent,
    manualyticsEventRepository: Repository<core.ManualyticsEvent>
  ) => Promise<void> = async (manualyticsEvent, manualyticsEventRepository) =>
    manualyticsEventRepository.save(manualyticsEvent);
}
