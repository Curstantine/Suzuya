export enum Demographic {
  shounen,
  shoujo,
  josei,
  seinen
}

export enum Status {
  ongoing,
  completed,
  hiatus,
  cancelled
}

export enum ReadingStatus {
  reading,
  on_hold,
  plan_to_read,
  dropped,
  re_reading,
  completed
}

export enum ContentRating {
  safe,
  suggestive,
  erotica,
  pornographic
}

export enum MangaLink {
  /** AniList */
  al,
  /** AnimePlanet */
  ap,
  /* BookWalker */
  bw,
  /** MangaUpdates */
  mu,
  /** NovelUpdate */
  nu,
  /** Kitsu */
  kt,
  /** Amazon */
  amz,
  /** EbookJapan */
  ebj,
  /** MyAnimeList */
  mal,
  /** CD Japan */
  cdj,
  /** Raw */
  raw,
  /** English Tl */
  engt,
}

/// Names used in the `"related"` field in relationships.
export enum MangaRelated {
  monochrome,
  colored,
  preserialization,
  serialization,
  prequel,
  sequel,
  main_story,
  side_story,
  adapted_from,
  spin_off,
  based_on,
  doujinshi,
  same_franchise,
  shared_universe,
  alternate_story,
  alternate_version,
}

export enum MangaTagGroups {
  genre,
  format,
  theme,
}
