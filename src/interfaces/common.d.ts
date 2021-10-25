import { ServerMangaAttribute, ServerMangaTagAttributes } from './manga';

export enum RelationShipTypes {
  'manga',
  'chapter',
  'cover_art',
  'author',
  'artist',
  'scanlation_group',
  'tag',
  'user',
  'custom_list',
}

export interface ServerResponse {
  result: 'ok' | 'error';
}

export interface ServerError {
  id: string;
  status: number;
  title: string;
  detail: string;
}

interface ServerEntityAttributes {
  manga: ServerMangaAttribute;
  tag: ServerMangaTagAttributes;
}

export interface ServerRelationships<T extends RelationShipTypes> {
  id: string;
  type: T;
  related: string;
  attributes: ServerEntityAttributes[T];
}

export interface ServerEntityResponse<T extends RelationShipTypes> extends ServerResponse {
  response: 'entity';
  data: {
    id: string;
    type: T;
    attributes: ServerEntityAttributes[T];
    relationships: ServerRelationships;
  };
}

/** UUID */
export type UUID = string;
