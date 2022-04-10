import { Entry } from './common';
import { RelationshipTypes } from './relationship';
import { LocaleTitles } from './lang';

export interface TagAttributes {
  name: LocaleTitles,
  description: LocaleTitles,
  // TODO: Typings
  group: string,
  version: number,
}

export type Tag = Entry<RelationshipTypes.tag, TagAttributes, undefined>;
