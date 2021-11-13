export interface ChapterAttribute {
  title: string;
  volume: string;
  chapter: string;
  translatedLanguage: string;
  hash: string;
  data: string[];
  dataSaver: string[];
  uploader: string;
  externalUrl: string;
  version: 1;
  createdAt: string;
  updatedAt: string;
  publishAt: string;
}

export interface ChapterQueryParameters {
  limit: number;
  offset: number;
  "ids[]": string[];
  title: string;
  "groups[]": string[];
  uploader: string;
  manga: string;
  "volume[]": string | string[];
  chapter: string | string[];
  "translatedLanguage[]": string[];
  "originalLanguage[]";
}
