import type { ChapterAttribute } from "../chapter/types";
import type { MangaAttribute, MangaTagAttributes } from "../manga/types";
import type { RelationshipTypes, ResponseTypes } from "./enums";

export interface Response {
  result: "ok" | "error";
}

export interface Error {
  id: string;
  status: number;
  title: string;
  detail: string;
}

interface Relationships {
  id: string;
  type: RelationshipTypes;
}

/**
 * Attribute for type {@link ResponseTypes manga_relation} \
 * Not part of {@link Relationships}
 */
interface RelationAttribute {
  relation: string;
  version: number;
}

interface EntityAttributes {
  // TODO: Remove this
  [key: string]: any;
  manga: MangaAttribute;
  chapter: ChapterAttribute;
  cover_art: "";
  author: "";
  artist: "";
  scanlation_group: "";
  tag: MangaTagAttributes;
  user: "";
  custom_list: "";
  manga_relation: RelationAttribute;
}

export interface EntityResponse<T extends ResponseTypes> extends Response {
  response: "entity";
  data: {
    id: string;
    type: T;
    attributes: EntityAttributes[T];
    relationships: Relationships[];
  };
}

export interface CollectionResponse<T extends ResponseTypes> extends Response {
  response: "collection";
  data: EntityResponse<T>["data"][];
  limit: number;
  offset: number;
  total: number;
}
