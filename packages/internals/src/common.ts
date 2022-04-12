import { Relationship, RelationshipTypes } from './relationship';

export enum ResponseResult {
  ok,
  error
}

export enum ResponseType {
  entity,
  collection
}

export enum Conditional {
  AND,
  OR,
}

export enum ConditionalBoolean {
  true,
  false,
}

export enum Sort {
  asc,
  desc,
}

export enum State {
  published,
  draft,
  rejected
}

export enum CustomListVisibility {
  public,
  private,
}

/**
 * Special kind of entry,
 * typically used inside relationships.
 *
 * Doesn't contain nested `relationship` field and `attributes` field.
 */
export interface DummyEntry<Type extends RelationshipTypes> {
  id: string,
  type: Type,
}

/**
 * This is the usual type of entry,
 * used in titles and such.
 *
 * Contains a `relationship` field.
 *
 * `RelatedType` should contain the types `relationship.related` contain,
 *  eg: {@link Manga} should have {@link MangaRelated}
 */
export interface Entry<Type extends RelationshipTypes, Attributes, RelatedType>
  extends DummyEntry<Type> {
  attributes: Attributes,
  relationships: Relationship<RelatedType>[],
}

export interface BaseResponse {
  result: ResponseResult.ok,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Entity<Data extends Entry<any, any, any>>
  extends BaseResponse {
  type: ResponseType.entity,
  data: Data,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Collection<Data extends Array<Entry<any, any, any>>>
  extends BaseResponse {
  type: ResponseType.collection,
  data: Data,
  limit: number,
  offset: number,
  total: number,
}