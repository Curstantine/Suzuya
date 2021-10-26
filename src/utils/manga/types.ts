import type { Response, EntityResponse } from "../extra/common";
import type {
  MangaState,
  MangaStatus,
  ContentRating,
  PublicationDemographic,
  MagnaRelated,
  MangaReadingStatus,
  CustomListVisibility,
} from "../extra/enums";
import type { LangCodeObject, LangCodes } from "../locale";

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

export interface MangaAttribute {
  title: LangCodeObject;
  altTitles: LangCodeObject[];
  description: LangCodeObject;
  isLocked: true;
  links: MangaLinks;
  originalLanguage: LangCodes;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: PublicationDemographic;
  status: string;
  year: number;
  contentRating: ContentRating;
  tags: EntityResponse<"tag">[];
  state: MangaState;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface MangaTagAttributes {
  name: LangCodeObject;
  description: LangCodeObject;
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
  "authors[]"?: string[];
  "artists[]"?: string[];
  year?: number;
  "includedTags[]"?: string[];
  includedTagsMode?: "AND" | "OR";
  "excludedTags[]"?: string[];
  excludedTagsMode?: "AND" | "OR";
  "status[]"?: ["ongoing" | "completed" | "hiatus" | "cancelled"];
  "originalLanguage[]"?: LangCodes[];
  "excludedOriginalLanguage[]"?: LangCodes[];
  "availableTranslatedLanguage[]"?: LangCodes[];
  "publicationDemographic[]"?: PublicationDemographic[];

  /** Array of UUIDs as strings; Max: 100 */
  "ids[]"?: string[];

  /** Defaults to  ["safe","suggestive","erotica"] */
  "contentRating[]"?: ContentRating[];

  /** DateTime string with following format: YYYY-MM-DDTHH:MM:SS */
  createdAtSince?: string;

  /** DateTime string with following format: YYYY-MM-DDTHH:MM:SS */
  updatedAtSince?: string;

  /** Default: ```{"latestUploadedChapter":"desc"}``` */
  // TODO: Handle this in the search, right now it fails.
  order?: {
    title?: "asc" | "desc";
    year?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
    latestUploadedChapter?: "asc" | "desc";
    followedCount?: "asc" | "desc";
    relevance?: "asc" | "desc";
  };
  "includes[]"?: string[];
}

export interface MangaFeedParameters {
  [key: string]: any;
  /** Must be between 1-100; Default: 10 */
  limit?: number;
  /** Must be more than or equal to 0 */
  offset?: number;
  "translatedLanguage[]"?: LangCodes[];
  "originalLanguage[]"?: LangCodes[];
  "excludedOriginalLanguage[]"?: LangCodes[];

  /** `0` or `1` to represent false and true */
  includeFutureUpdates?: number;

  /** Defaults to  ["safe","suggestive","erotica"] */
  "contentRating[]"?: ContentRating[];

  /** DateTime string with following format: YYYY-MM-DDTHH:MM:SS */
  createdAtSince?: string;

  /** DateTime string with following format: YYYY-MM-DDTHH:MM:SS */
  updatedAtSince?: string;

  // TODO: Handle this in the search, right now it fails.
  order?: {
    volume?: "asc" | "desc";
    chapter?: "asc" | "desc";
  };
  "includes[]"?: string[];
}

export interface MangaCreateBody {
  title: LangCodeObject;
  altTitles?: LangCodeObject[];
  description?: LangCodeObject;
  authors?: string[];
  artists?: string[];
  links?: MangaLinks;
  originalLanguage: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: PublicationDemographic;
  status: MangaStatus;
  year?: number;
  contentRating: ContentRating;
  tags?: string[];
  modNotes?: string;
  version?: number;
}

export interface MangaUpdateBody {
  title?: LangCodeObject;
  altTitles?: LangCodeObject[];
  description?: LangCodeObject;
  authors?: string[];
  artists?: string[];
  links?: MangaLinks;
  originalLanguage?: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: PublicationDemographic;
  status: MangaStatus;
  year?: number;
  contentRating?: ContentRating;
  tags?: string[];
  modNotes?: string;
  version: number;
}

export interface MangaVolumeResponse extends Response {
  volumes: {
    [key: string | "none"]: {
      volume: string;
      count: number;
      chapters: {
        [key: string | "none"]: {
          chapter: string;
          id: string;
          count: number;
        };
      };
    };
  };
}

export interface MangaStatusesResponse extends Response {
  statuses: {
    [key: string]: MangaStatus;
  };
}

export interface MangaStatusResponse extends Response {
  status: MangaStatus;
}

export interface MangaDraftSubmitBody {
  version: number;
}

export interface MangaDraftParameters {
  [key: string]: any;
  limit?: number;
  offset?: number;
  user?: string;
  state?: MangaState;
  order?: {
    title?: "asc" | "desc";
    year?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
  "includes[]"?: string[];
}
