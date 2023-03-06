import { makeRepository } from './persistence';

export interface AppENV {
  ManualyticsEventEnv: KVNamespace;
  AUTH_KEY: string;
  ACCOUNT_ID: string;
  API_TOKEN: string;
  NAMESPACE_ID: string;
}

export type Repository = ReturnType<typeof makeRepository>;

export type Request = PagesFunction<AppENV & { MESSAGE_REPO: Repository }>;

export type MiddlewareRequest = PagesPluginFunction<
  AppENV & { MESSAGE_REPO?: Repository }
>;
