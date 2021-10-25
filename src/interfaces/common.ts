import { ServerMangaAttribute, ServerMangaTagAttributes } from './manga';

export type RelationShipTypes =
  | 'manga'
  | 'chapter'
  | 'cover_art'
  | 'author'
  | 'artist'
  | 'scanlation_group'
  | 'tag'
  | 'user'
  | 'custom_list';

export interface ServerResponse {
  result: 'ok' | 'error';
}

export interface ServerError {
  id: UUID;
  status: number;
  title: string;
  detail: string;
}

interface ServerEntityAttributes {
  [key: string]: any;
  manga: ServerMangaAttribute;
  tag: ServerMangaTagAttributes;
}

export interface ServerRelationships<T extends RelationShipTypes> {
  id: UUID;
  type: T;
  related: string;
  attributes: ServerEntityAttributes[T];
}

export interface ServerEntityResponse<T extends RelationShipTypes> extends ServerResponse {
  response: 'entity';
  data: {
    id: UUID;
    type: T;
    attributes: ServerEntityAttributes[T];
    relationships: ServerRelationships<T>;
  };
}

export interface ServerCollectionResponse<T extends RelationShipTypes> extends ServerResponse {
  response: 'collection';
  data: ServerEntityResponse<T>['data'][];
  limit: number;
  offset: number;
  total: number;
}

/** UUID */
export type UUID = string;
