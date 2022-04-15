import { LanguageCodes } from './lang';
import { Collection, Entity, Entry, Sort } from './common';
import { RelationshipTypes } from './relationship';

/**
 * Chapter Entry.
 *
 * This alone is not returned by the server.
 * It's either wrapped inside a {@link Entity} or a {@link Collection}.
 */
export type Chapter = Entry<RelationshipTypes.chapter, ChapterAttributes, undefined>;
/**
 * Represents a single {@link Chapter} response from the server.
 */
export type ChapterEntity = Entity<Chapter>;
/**
 * Represents a response with multiple {@link Chapter chapters}
 * typically returned by the server for queries.
 */
export type ChapterCollection = Collection<Chapter[]>;

/**
 * Sorting type for responses with {@link Chapter} type.
 */
export interface ChapterSort {
  createdAt?: Sort,
  updatedAt?: Sort,
  publishAt?: Sort,
  readableAt?: Sort,
  volume?: Sort,
  chapter?: Sort
}

interface ChapterAttributes {
  title: string,
  volume: string,
  chapter: string,
  pages: number,
  translatedLanguage: LanguageCodes,
  /// UUID
  uploader: string,
  externalUrl: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  createdAt: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  updatedAt: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  publishAt: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  readableAt: string,
  version: number,
}