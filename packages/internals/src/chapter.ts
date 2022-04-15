import { LanguageCodes } from './lang';
import { Entry, Sort } from './common';
import { RelationshipTypes } from './relationship';

/**
 * Chapter Entry.
 *
 * RThis alone is not returned by the server.
 * It's either wrapped inside a {@link Entity} or a {@link Collection}.
 */
export type Chapter = Entry<RelationshipTypes.chapter, ChapterAttributes, RelationshipTypes>;

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