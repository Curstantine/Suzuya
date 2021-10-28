export interface CoverAttribute {
  volume: string;
  fileName: string;
  description: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoverQueryParameters {
  limit?: number;
  offset?: number;
  /** Manga uuids (limited to 100 per request) */
  manga?: string[];
  /** Covers uuids (limited to 100 per request) */
  ids?: string[];
  /** User uuids (limited to 100 per request) */
  uploaders?: string[];
  order?: {
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
    volume?: "asc" | "desc";
  };
  includes?: string[];
}

export interface CoverUploadBody {
  /** Binary data as a string */
  file: string;
  volume: string | null;
}

export interface CoverEditBody {
  volume: number;
  description?: string;
  version: number;
}
