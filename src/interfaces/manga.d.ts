import { ServerEntityResponse } from './common';
import { LangCodes } from './languageCodes';

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
  al: string;
  /** AnimePlanet */
  ap: string;
  /* BookWalker */
  bw: string;
  /** MangaUpdates */
  mu: string;
  /** NovelUpdate */
  nu: string;
  /** Kitsu */
  kt: string;
  /** Amazon */
  amz: string;
  /** EbookJapan */
  ebj: string;
  /** MyAnimeList */
  mal: string;
  /** CD Japan */
  cdj: string;
  /** Raw */
  raw: string;
  /** English Tl */
  engtl: string;
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
  title: LangCodes;
  altTitles: LangCodes[];
  description: LangCodes;
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
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  group: string;
  version: number;
}
