import { Repository } from '../types';
import { now } from '../lib';

interface Message {
  from?: string;
  message?: string;
  contact?: string;
}

export const handleSaveManualyticsMessage = (
  repository: Repository,
  message: Message
) => repository.save(now(), JSON.stringify(message), { metadata: message });

export const handleListManualytics = async (repository: Repository) =>
  (await repository.list<Message>()).keys.map(({ name, metadata }) => ({
    ...metadata,
    name,
  }));

export const handleDeleteManualytics = (repository: Repository, key: string) =>
  repository.del(key);
