import { Conditional, ConditionalBoolean } from '../common';
import { LanguageCodes } from '../lang';
import { RelationshipTypes } from '../relationship';
import { MangaSort } from './index';
import { ContentRating, Demographic, Status } from './enum';
import { ChapterSort } from '../chapter';

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

