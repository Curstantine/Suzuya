export type RelationshipTypes =
  | "manga"
  | "chapter"
  | "cover_art"
  | "author"
  | "artist"
  | "scanlation_group"
  | "tag"
  | "user"
  | "custom_list";

export type MangaRelated =
  | "monochrome"
  | "main_story"
  | "adapted_from"
  | "based_on"
  | "prequel"
  | "side_story"
  | "doujinshi"
  | "same_franchise"
  | "shared_universe"
  | "sequel"
  | "spin_off"
  | "alternate_story"
  | "preserialization"
  | "colored"
  | "serialization";

export type MangaReadingStatus =
  | "reading"
  | "on_hold"
  | "plan_to_read"
  | "dropped"
  | "re_reading"
  | "completed";

export type ResponseTypes = RelationshipTypes | "manga_relation";
export type MangaStatus = "ongoing" | "completed" | "hiatus" | "cancelled";
export type PublicationDemographic = "shounen" | "shoujo" | "josei" | "seinen";
export type ContentRating = "safe" | "suggestive" | "erotica" | "pornographic";
export type MangaState = "draft" | "submitted" | "rejected";
export type CustomListVisibility = "public" | "private";
export type Status = "ongoing" | "completed" | "hiatus" | "cancelled";
