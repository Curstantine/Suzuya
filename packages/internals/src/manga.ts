import { Entity, Entry, Query, State } from './common';
import { RelationshipTypes } from './relationship';
import { LanguageCodes, LocaleTitles } from './lang';
import { Tag } from './tag';

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
 * it's either wrapped inside a {@link Entity} or a {@link Query}
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
export type MangaQuery = Query<Manga[]>;

/**
 * Body needed to create a new title.
 */
export interface MangaCreationBody {
  title: LocaleTitles,
  altTitles: LocaleTitles[],
  description: LocaleTitles[],
  /// Array of UUIDs
  authors: string[],
  /// Array of UUIDs
  artists: string[],
  links: MangaLinks,
  lastVolume: string,
  lastChapter: string,
  publicationDemographic: Demographic,
  status: Status,
  year: number,
  contentRating: ContentRating,
  chapterNumbersResetOnNewVolume: boolean,
  /// Array of UUIDs
  tags: string[],
  /// UUIDs
  primaryCover: string,
  version: number,
}

/**
 * Attributes of the title returned by the server after title creation.
 */
export interface MangaCreationDraftAttributes extends MangaAttributes {
  state: State.draft,
}
/**
 * Entry response of the title returned by the server after title creation.
 */
export type MangaCreationDraft = Entry<RelationshipTypes.manga, MangaCreationDraftAttributes, MangaRelated>;
/**
 * Entity response of the title returned by the server.
 *
 * **This is the raw response returned by the server**
 */
export type MangaCreationDraftEntity = Entity<MangaCreationDraft>;