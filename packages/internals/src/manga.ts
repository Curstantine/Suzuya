import { BaseResponse, Collection, Conditional, ConditionalBoolean, Entity, Entry, Sort, State } from './common';
import { RelationshipTypes } from './relationship';
import { LanguageCodes, LocaleTitles } from './lang';
import { Tag } from './tag';
import { ChapterSort } from './chapter';

export enum Demographic {
  shounen,
  shoujo,
  josei,
  seinen
}

export enum Status {
  ongoing,
  completed,
  hiatus,
  cancelled
}

export enum ReadingStatus {
  reading,
  on_hold,
  plan_to_read,
  dropped,
  re_reading,
  completed
}

export enum ContentRating {
  safe,
  suggestive,
  erotica,
  pornographic
}

export enum MangaLinkData {
  /** AniList */
  al,
  /** AnimePlanet */
  ap,
  /* BookWalker */
  bw,
  /** MangaUpdates */
  mu,
  /** NovelUpdate */
  nu,
  /** Kitsu */
  kt,
  /** Amazon */
  amz,
  /** EbookJapan */
  ebj,
  /** MyAnimeList */
  mal,
  /** CD Japan */
  cdj,
  /** Raw */
  raw,
  /** English Tl */
  engt,
}

export type MangaLinks = {
  [K in MangaLinkData]?: string;
}

/// This data is used in the "related" field of a Manga relationships
export enum MangaRelated {
  monochrome,
  colored,
  preserialization,
  serialization,
  prequel,
  sequel,
  main_story,
  side_story,
  adapted_from,
  spin_off,
  based_on,
  doujinshi,
  same_franchise,
  shared_universe,
  alternate_story,
  alternate_version,
}

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
 * Manga entry.
 *
 * This alone is not returned by the server,
 * it's either wrapped inside a {@link Entity} or a {@link Collection}
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

export interface MangaQueryParameters {
  /// Minimum: 0, Maximum: 100, Default: 10
  'limit'?: number,
  /// >=0
  'offset'?: number,
  'title'?: string,
  /// Array of UUIDs
  'authors[]'?: string[],
  /// Array of UUIDs
  'artists[]'?: string[],
  'year'?: number,
  /// Array of UUIDs
  'includedTags[]'?: string[],
  /// Defaults to {@link Conditional.AND}
  'includedTagsMode'?: Conditional,
  /// Array of UUIDs
  'excludedTags[]'?: string[],
  'excludedTagsMode'?: Conditional,
  'status[]'?: Status[],
  'originalLanguage[]'?: LanguageCodes[],
  'excludedOriginalLanguage[]'?: LanguageCodes[],
  'availableTranslatedLanguage[]'?: LanguageCodes[],
  'publicationDemographic[]'?: Demographic[],
  /// Array of UUIDs
  'ids[]'?: string[],
  'contentRating[]'?: ContentRating[],
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  'createdAtSince'?: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  'updatedAtSince'?: string,
  'order'?: MangaSort,
  'includes[]'?: RelationshipTypes[],
  'hasAvailableChapters'?: ConditionalBoolean,
  /// Array of UUIDs
  'group'?: string[]
}

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
 * Attributes of the title returned by the server after title creation.
 */
export interface MangaCreationDraftAttributes extends MangaAttributes {
  state: State.draft,
}

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

/**
 * Response returned by the server after `manga_id/aggregate`,
 * contains chapters, volumes and their respective data.
 */
export type MangaAggregate = BaseResponse & MangaAggregateData;

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

/**
 * Attributes of the title returned by the server after a title is updated.
 */
export type MangaUpdateDraftAttributes = MangaCreationDraftAttributes;
/**
 * Entry response of the title returned by the server
 * after title creation.
 */
export type MangaUpdateDraft = Entry<RelationshipTypes.manga, MangaCreationDraftAttributes, MangaRelated>;
/**
 * Entity response of the title returned by the server
 * when a title is updated.
 *
 * Contains {@link MangaUpdateDraftAttributes}
 */
export type MangaUpdateDraftEntity = Entity<MangaUpdateDraft>;

/// Response returned by the server for a successful deletion.
export type MangaDelete = BaseResponse;

/// Response returned by the server for a successful unfollow.
export type MangaUnfollow = BaseResponse;

/// Response returned by the server for a successful follow.
export type MangaFollow = BaseResponse;

export interface MangaFeedParameters {
  /// Minimum: 0, Maximum: 100, Default: 10
  'limit'?: number,
  /// >=0
  'offset'?: number,
  'translatedLanguage[]'?: LanguageCodes[],
  'originalLanguage[]'?: LanguageCodes[],
  'excludedOriginalLanguage[]'?: LanguageCodes[],
  'contentRating[]'?: ContentRating[],
  /// Array of UUIDs
  'excludedGroups[]'?: string[],
  /// Array of UUIDs
  'excludedUploaders[]'?: string[],
  'includeFutureUpdates'?: ConditionalBoolean,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  'createdAtSince'?: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  'updatedAtSince'?: string,
  /// ISO 8601 DateTime string with following format: YYYY-MM-DDTHH:MM:SS
  'publishAtSince'?: string,
  'order'?: ChapterSort,
  'includes[]'?: RelationshipTypes[],
}