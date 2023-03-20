import { createSlice } from '@reduxjs/toolkit';

import type { HNItem } from '@/types/hn';
import type { AppState } from './index';

const initialState: { items: HNItem[] } = {
  items: [
    {
      by: 'user',
      dead: false,
      deleted: false,
      id: '35222999',
      kids: [],
      score: 0,
      time: Date.now() / 1000,
      title: 'Nations reach accord to protect marine life on high seas',
      type: 'story',
      url: 'https://apnews.com/article/un-oceans-biodiversity-treaty-0b024fa07e8c1947236d8b8491ebf92c',
    },
    {
      by: 'user',
      dead: false,
      deleted: false,
      id: '35226420',
      kids: [],
      score: 0,
      time: Date.now() / 1000,
      title: 'Who becomes an entrepreneur? Insights from 7 research studies',
      type: 'story',
      url: 'https://www.generalist.com/briefing/who-becomes-an-entrepreneur',
    },
  ],
};

const hnSlice = createSlice({
  name: 'hn',
  initialState,
  reducers: {
    test(state) {
      console.warn(state);
    },
  },
});

export default hnSlice;

export function selectHnItems(state: AppState) {
  return state.hn.items;
}
