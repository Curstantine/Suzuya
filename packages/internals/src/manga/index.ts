import { BaseResponse, Collection, Entity, Entry, Sort, State } from '../common';
import { RelationshipTypes } from '../relationship';
import { LanguageCodes, LocaleTitles } from '../lang';
import { Tag } from '../tag';
import { ChapterCollection } from '../chapter';
import { ContentRating, Demographic, MangaLink, MangaRelated, Status } from './enum';

// --- Basic Types ---
/**
 * Manga Entry.
 *
 * This alone is not returned by the server,
 * It's either wrapped inside a {@link Entity} or a {@link Collection}
 */
export type Manga = Entry<RelationshipTypes.manga, MangaAttributes, MangaRelated>;
/**
 * Represents a single {@link Manga} response from the server.
 */
export type MangaEntity = Entity<Manga>;
/**
 * Represents a response with multiple {@link Manga} structures,
 * typically returned by the server for queries.
 */
export type MangaCollection = Collection<Manga[]>;

/**
 * Entry response of the title returned by the server
 * after title creation.
 */
export type MangaCreationDraft = Entry<RelationshipTypes.manga, MangaCreationDraftAttributes, MangaRelated>;
/**
 * Entity response of the title returned by the server when
 * a title is created.
 *
 * Contains {@link MangaCreationDraft}
 */
export type MangaCreationDraftEntity = Entity<MangaCreationDraft>;

/**
 * Response returned by the server after `manga_id/aggregate`,
 * contains chapters, volumes and their respective data.
 */
export type MangaAggregate = BaseResponse & MangaAggregateData;

/**
 * Entry response of the title returned by the server
 * after title creation.
 */
export type MangaUpdateDraft = Entry<RelationshipTypes.manga, MangaCreationDraftAttributes, MangaRelated>;
/**
 * Entity response of the title returned by the server
 * when a title is updated.
 */
export type MangaUpdateDraftEntity = Entity<MangaUpdateDraft>;

/**
 * Response returned by the server for a successful deletion.
 */
export type MangaDelete = BaseResponse;

/**
 * Response returned by the server for a successful unfollow.
 */
export type MangaUnfollow = BaseResponse;

/**
 * Response returned by the server for a successful follow.
 */
export type MangaFollow = BaseResponse;

/**
 * Returns a {@link Collection collection} of chapters.
 */
export type MangaFeed = ChapterCollection;

// --- POST Bodies ---
/**
 * Body needed to create a new title.
 */
export interface MangaCreationBody {
  title: LocaleTitles,
  altTitles?: LocaleTitles[],
  description?: LocaleTitles[],
  /// Array of UUIDs
  authors?: string[],
  /// Array of UUIDs
  artists?: string[],
  links?: MangaLinks,
  originalLanguage: LanguageCodes,
  lastVolume?: string,
  lastChapter?: string,
  publicationDemographic?: Demographic,
  status: Status,
  year?: number,
  contentRating: ContentRating,
  chapterNumbersResetOnNewVolume?: boolean,
  /// Array of UUIDs
  tags?: string[],
  /// UUIDs
  primaryCover?: string,
  version?: number,
}

/**
 * Body needed to update a title.
 */
export interface MangaUpdateBody {
  title?: LocaleTitles,
  altTitles?: LocaleTitles[],
  description?: LocaleTitles[],
  /// Array of UUIDs
  authors?: string[],
  /// Array of UUIDs
  artists?: string[],
  links?: MangaLinks,
  originalLanguage?: LanguageCodes,
  lastVolume?: string,
  lastChapter?: string,
  publicationDemographic?: Demographic,
  status?: Status,
  year?: number,
  contentRating?: ContentRating,
  chapterNumbersResetOnNewVolume?: boolean,
  /// Array of UUIDs
  tags?: string[],
  /// UUIDs
  primaryCover?: string,
  version: number,
}

// --- Attributes ---
export interface MangaAttributes {
  title: LocaleTitles,
  altTitles: LocaleTitles[],
  description: LocaleTitles,
  isLocked: boolean,
  links: MangaLinks,
  originalLanguage: LanguageCodes,
  lastVolume: string,
  lastChapter: string,
  publicationDemographic: Demographic,
  status: Status,
  year: number,
  contentRating: ContentRating,
  chapterNumbersResetOnNewVolume: boolean,
  tags: Tag[]
  state: State,
  version: number,
  createdAt: Date,
  updatedAt: Date,
  availableTranslatedLanguages: LanguageCodes[],
}

/**
 * Attributes of the title returned by the server after title creation.
 */
export interface MangaCreationDraftAttributes extends MangaAttributes {
  state: State.draft,
}

/**
 * Attributes of the title returned by the server after a title is updated.
 */
export type MangaUpdateDraftAttributes = MangaCreationDraftAttributes;

// --- Extra ---
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


