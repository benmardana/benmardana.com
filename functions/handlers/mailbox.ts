import { Repository } from '../types';
import { now } from '../lib';

interface Mail {
  from?: string;
  message?: string;
  contact?: string;
}

export const handleSaveMail = (repository: Repository, mail: Mail) =>
  repository.save(now(), JSON.stringify(mail), { metadata: mail });

export const handleListMail = async (repository: Repository) =>
  (await repository.list<Mail>()).keys.map(({ name, metadata }) => ({
    ...metadata,
    id: name,
  }));

export const handleDeleteMail = (repository: Repository, key: string) =>
  repository.del(key);
