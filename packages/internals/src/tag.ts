import { Entry } from './common';
import { RelationshipTypes } from './relationship';
import { LocaleTitles } from './lang';

export interface TagAttributes<Group> {
  name: LocaleTitles,
  description: LocaleTitles[],
  group: Group,
  version: number,
}

export type Tag<Group> = Entry<RelationshipTypes.tag, TagAttributes<Group>, undefined>;
