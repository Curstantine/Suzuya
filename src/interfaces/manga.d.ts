import { ServerEntityResponse, UUID } from './common';
import { LangCodeObject, LangCodes } from './locales';

export enum MangaStatus {
  'ongoing',
  'completed',
  'hiatus',
  'cancelled',
}

export enum MangaReadingStatus {
  'reading',
  'on_hold',
  'plan_to_read',
  'dropped',
  're_reading',
  'completed',
}

export enum PublicationDemographic {
  'shounen',
  'shoujo',
  'josei',
  'seinen',
}

export enum ContentRating {
  'safe',
  'suggestive',
  'erotica',
  'pornographic',
}

export enum MangaState {
  'draft',
}

export enum CustomListVisibility {
  'public',
  'private',
}

export interface MangaLinks {
  /** AniList */
  al?: string;
  /** AnimePlanet */
  ap?: string;
  /* BookWalker */
  bw?: string;
  /** MangaUpdates */
  mu?: string;
  /** NovelUpdate */
  nu?: string;
  /** Kitsu */
  kt?: string;
  /** Amazon */
  amz?: string;
  /** EbookJapan */
  ebj?: string;
  /** MyAnimeList */
  mal?: string;
  /** CD Japan */
  cdj?: string;
  /** Raw */
  raw?: string;
  /** English Tl */
  engtl?: string;
}

export enum MagnaRelated {
  'monochrome',
  'main_story',
  'adapted_from',
  'based_on',
  'prequel',
  'side_story',
  'doujinshi',
  'same_franchise',
  'shared_universe',
  'sequel',
  'spin_off',
  'alternate_story',
  'preserialization',
  'colored',
  'serialization',
}

export interface ServerMangaAttribute {
  title: LangCodeObject;
  altTitles: LangCodeObject[];
  description: LangCodeObject;
  isLocked: true;
  links: MangaLinks;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: PublicationDemographic;
  status: string;
  year: number;
  contentRating: ContentRating;
  tags: ServerEntityResponse<'tag'>[];
  state: MangaState;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServerMangaTagAttributes {
  name: LangCodes;
  description: LangCodes;
  group: string;
  version: number;
}

export interface MangaQueryParameters {
  [key: string]: any;
  /** Must be between 1-100; Default: 10 */
  limit?: number;
  /** Must be more than or equal to 0 */
  offset?: number;
  title?: string;
  'authors[]'?: UUID[];
  'artists[]'?: UUID[];
  year?: number;
  'includedTags[]'?: UUID[];
  includedTagsMode?: 'AND' | 'OR';
  'excludedTags[]'?: UUID[];
  excludedTagsMode?: 'AND' | 'OR';
  'status[]'?: ['ongoing' | 'completed' | 'hiatus' | 'cancelled'];
  'originalLanguage[]'?: LangCodes[];
  'excludedOriginalLanguage[]'?: LangCodes[];
  'availableTranslatedLanguage[]'?: LangCodes[];
  'publicationDemographic[]'?: PublicationDemographic[];

  /** Array of UUIDs as strings; Max: 100 */
  'ids[]'?: UUID[];

  /** Defaults to  ["safe","suggestive","erotica"] */
  'contentRating[]'?: ContentRating[];

  /** DateTime string with following format: YYYY-MM-DDTHH:MM:SS */
  createdAtSince?: string;

  /** DateTime string with following format: YYYY-MM-DDTHH:MM:SS */
  updatedAtSince?: string;

  /** Default: {"latestUploadedChapter":"desc"} */
  order?: {
    title?: 'asc' | 'desc';
    year?: 'asc' | 'desc';
    createdAt?: 'asc' | 'desc';
    updatedAt?: 'asc' | 'desc';
    latestUploadedChapter?: 'asc' | 'desc';
    followedCount?: 'asc' | 'desc';
    relevance?: 'asc' | 'desc';
  };
  'includes[]'?: string[];
}
