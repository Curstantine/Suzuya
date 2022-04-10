import { DummyEntry } from './common';

export enum RelationshipTypes {
  manga,
  chapter,
  /**
   *  **NOTE**: In manga resources you get only one `cover_art`
   * resource relation marking the primary cover
   * if there are more than one.
   * By default, this will be the latest volume's cover art.
   */
  cover_art,
  author,
  artist,
  scanlation_group,
  tag,
  user,
  custom_list,
}

export interface RelationshipEntry<Type extends RelationshipTypes, RelatedType> extends DummyEntry<Type> {
  related?: RelatedType;
}

export type Relationship<RelatedType, Type extends RelationshipTypes = RelationshipTypes>
  = RelationshipEntry<Type, RelatedType>;
