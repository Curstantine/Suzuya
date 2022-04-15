import { Sort } from '../common';
import { MangaLink } from './enum';

/**
 * Basic sorting used for querying server for titles.
 *
 * Defaults to `latestUploadedChapter`: {@link Sort.desc descending}
 */
export interface MangaSort {
  title?: Sort,
  year?: Sort,
  createdAt?: Sort,
  updatedAt?: Sort,
  latestUploadedChapter?: Sort,
  followedCount?: Sort,
  relevance?: Sort,
}

export interface MangaAggregateChapter {
  id: string,
  chapter: string,
  /// Array of UUIDs
  others: string[],
  count: number,
}

export interface MangaAggregateVolume {
  volume: string,
  count: number,
  /// Mapped with chapter number as the key.
  chapters: { [key: string]: MangaAggregateChapter }
}

export interface MangaAggregateData {
  volumes: { [key: string]: MangaAggregateVolume };
}

export type MangaLinks = {
  [K in MangaLink]?: string;
}

