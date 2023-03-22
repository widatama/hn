type HNItemType = 'comment' | 'job' | 'poll' | 'pollopt' | 'story';

// From https://github.com/HackerNews/API#items
export interface RawHNItem {
  by: string;
  dead: boolean;
  deleted: boolean;
  descendants?: number;
  id: number;
  kids?: number[];
  parent?: number;
  parts?: string[];
  poll?: string;
  score: number;
  text?: string; // HTML
  time: number; // Unix time
  title: string; // HTML
  type: HNItemType;
  url?: string;
}

export interface HNItem extends RawHNItem {
  creatorUrl: string;
  itemHostname?: string;
  itemUrl: string;
}

// From https://github.com/HackerNews/API#users
export interface HNUser {
  about: string; // HTML
  created: number; // Unix time
  id: string;
  karma: number;
  submitted: string[];
}
