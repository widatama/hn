type HNItemType = 'comment' | 'job' | 'poll' | 'pollopt' | 'story';

// From https://github.com/HackerNews/API#items
export interface HNItem {
  by: string;
  dead: boolean;
  deleted: boolean;
  descendants?: number;
  id: string;
  kids?: string[];
  parent?: string;
  parts?: string[];
  poll?: string;
  score: number;
  text?: string; // HTML
  time: number; // Unix time
  title: string; // HTML
  type: HNItemType;
  url: string;
}

// From https://github.com/HackerNews/API#users
export interface HNUser {
  about: string; // HTML
  created: number; // Unix time
  id: string;
  karma: number;
  submitted: string[];
}
