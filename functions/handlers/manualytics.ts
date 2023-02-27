import { Repository } from '../types';

interface Message {
  from?: string;
  message?: string;
  contact?: string;
}

export const handleManualyticsRequest = async (repository: Repository) =>
  (await repository.list<Message>()).keys.map(({ name, metadata }) => ({
    ...metadata,
    name,
  }));

export const handleManualyticsMessage = (
  repository: Repository,
  message: Message
) => repository.save(message, undefined, message);
