import { LanguageCodes } from './lang';
import { Entry, Sort } from './common';
import { RelationshipTypes } from './relationship';

export interface ChapterSort {
  createdAt?: Sort,
  updatedAt?: Sort,
  publishAt?: Sort,
  readableAt?: Sort,
  volume?: Sort,
  chapter?: Sort
}

export interface ChapterAttributes {
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

export type Chapter = Entry<RelationshipTypes.chapter, ChapterAttributes, RelationshipTypes>;