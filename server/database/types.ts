import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  subscribers: SubscriberTable;
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface SubscriberTable {
  uuid: UUID;

  subscription: {
    endpoint: string;
    expirationTime: number | null;
    keys: {
      auth: string;
      p256dh: string;
    };
  };

  browser: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
      versionName: string;
    };
    platform: {
      type: string;
      vendor: string;
    };
    engine: {
      name: string;
    };
  };

  location: {
    ip: string;
    continent_code: string;
    country: string;
    country_code: string;
    country_code3: string;
    latitude: number;
    longitude: number;
    timezone: string;
    offset: number;
    asn: number;
    organization: string;
  };

  createdat: ColumnType<Date, string | undefined, never>;
  updatedat: ColumnType<Date, string | undefined, string>;
}

export type Subscriber = Selectable<SubscriberTable>;
export type NewSubscriber = Insertable<SubscriberTable>;
export type SubscriberUpdate = Updateable<SubscriberTable>;
