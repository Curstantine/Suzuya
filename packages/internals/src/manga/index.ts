import { BaseResponse, Collection, Entity, Entry } from '../common';
import { RelationshipTypes } from '../relationship';
import { ChapterCollection } from '../chapter';
import { MangaRelated } from './enum';
import { MangaAttributes, MangaCreationDraftAttributes, MangaUpdateDraftAttributes } from './attributes';
import { MangaAggregateData } from './extra';

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
export type MangaUpdateDraft = Entry<RelationshipTypes.manga, MangaUpdateDraftAttributes, MangaRelated>;
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
