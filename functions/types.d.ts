import { repository } from './persistence';

export interface AppENV {
  ManualyticsEventEnv: KVNamespace;
  AUTH_KEY: string;
  ACCOUNT_ID: string;
  API_TOKEN: string;
  NAMESPACE_ID: string;
}

type Repository = ReturnType<typeof repository>;

export type Request = PagesFunction<AppENV & { MESSAGE_REPO: Repository }>;

export type MiddlewareContext = EventContext<
  AppENV & { MESSAGE_REPO?: Repository }
>;
