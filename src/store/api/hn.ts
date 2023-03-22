import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { HNItem, RawHNItem } from '@/types/hn';

function augmentHNItem(hnItem: RawHNItem, basePath = process.env.NEXT_PUBLIC_BASE_PATH): HNItem {
  const result: HNItem = { ...hnItem };

  const creatorUrl = new URL(window.location.origin);
  creatorUrl.pathname = `${basePath}/user`;
  creatorUrl.searchParams.append('id', result.by);
  result.creatorUrl = creatorUrl.href;

  if (result.url) {
    try {
      const externalUrl = new URL(result.url);
      result.itemHostname = externalUrl.hostname;
    } catch (err) {
      // result.url might not be valid, does not have to be handled
      // result.itemHostname will be undefined
    }
  }

  const itemUrl = new URL(window.location.origin);
  itemUrl.pathname = `${basePath}/item`;
  itemUrl.searchParams.append('id', result.id);
  result.itemUrl = itemUrl.href;

  return result;
}

const hnApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
  endpoints: (build) => ({
    getItem: build.query({
      query: (id) => ({ url: `/item/${id}.json` }),
      transformResponse: (response: RawHNItem) => augmentHNItem(response),
    }),
    getItems: build.query({
      queryFn: async (arg: number[], _queryApi, _extraOptions, fetchWithBQ) => {
        const proms: Promise = [];

        for (let count = 0; count < arg.length; count += 1) {
          proms.push(fetchWithBQ(`item/${arg[count]}.json`));
        }

        try {
          const responses = await Promise.allSettled(proms);
          const result: HNItem[] = [];

          responses.forEach((response) => {
            result.push(augmentHNItem(response.value.data as RawHNItem));
          });

          return { data: result };
        } catch (err) {
          return { error: err as fetchBaseQueryError };
        }
      },
    }),
    getTopItems: build.query({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const { limit, page } = arg;
        const topItemsResponse = await fetchWithBQ('/topstories.json');

        if (topItemsResponse.error) {
          return { error: topItemsResponse.error as fetchBaseQueryError };
        }

        const itemIds = topItemsResponse.data as number[];
        const proms: Promise = [];

        for (let count = ((page - 1) * limit); count < limit; count += 1) {
          proms.push(fetchWithBQ(`/item/${itemIds[count]}.json`));
        }

        try {
          const responses = await Promise.allSettled(proms);
          const result: HNItem[] = [];

          responses.forEach((response) => {
            result.push(augmentHNItem(response.value.data as RawHNItem));
          });

          return { data: result };
        } catch (err) {
          return { error: err as fetchBaseQueryError };
        }
      },
    }),
    getUser: build.query({
      query: (id) => ({ url: `/user/${id}.json` }),
    }),
  }),
  reducerPath: 'hnApi',
});

export default hnApi;

export const {
  useGetItemQuery,
  useGetItemsQuery,
  useGetTopItemsQuery,
  useGetUserQuery,
} = hnApi;
