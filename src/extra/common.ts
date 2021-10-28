import type { ChapterAttribute } from "../utils/chapter/types";
import type {
  MangaAttribute,
  MangaRelationAttribute,
  MangaTagAttributes,
} from "../utils/manga/types";
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

interface EntityAttributes {
  manga: MangaAttribute;
  chapter: ChapterAttribute;
  cover_art: "";
  author: "";
  artist: "";
  scanlation_group: "";
  tag: MangaTagAttributes;
  user: "";
  custom_list: "";
  manga_relation: MangaRelationAttribute;
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
