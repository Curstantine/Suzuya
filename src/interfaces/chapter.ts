import { UUID } from "./common";

export interface ServerChapterAttribute {
  title: string;
  volume: string;
  chapter: string;
  translatedLanguage: string;
  hash: string;
  data: string[];
  dataSaver: string[];
  uploader: UUID;
  externalUrl: string;
  version: 1;
  createdAt: string;
  updatedAt: string;
  publishAt: string;
}
