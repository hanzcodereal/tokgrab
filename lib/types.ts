export interface AuthorInfo {
  nickname?: string;
  avatar?: string;
  unique_id?: string;
}

export interface MusicInfo {
  title?: string;
  author?: string;
  cover?: string;
  play?: string;
}

export interface TiktokData {
  title?: string;
  cover?: string;
  origin_cover?: string;
  duration?: number;
  create_time?: number;
  region?: string;
  author?: AuthorInfo;
  play_count?: number;
  digg_count?: number;
  comment_count?: number;
  share_count?: number;
  download_count?: number;
  collect_count?: number;
  images?: string[];
  play?: string;
  wmplay?: string;
  hdplay?: string;
  size?: number;
  wm_size?: number;
  hd_size?: number;
  music?: string;
  music_info?: MusicInfo;
}

export interface TiktokApiResponse {
  success: boolean;
  message?: string;
  data?: TiktokData;
}
