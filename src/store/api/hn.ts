import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { HNItem, RawHNItem } from '@/types/hn';

function augmentHNItem(
  hnItem: RawHNItem,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH,
  upstreamURL = process.env.NEXT_PUBLIC_UPSTREAM_URL,
): HNItem {
  const result = { ...hnItem } as HNItem;

  const creatorUrl = new URL(window.location.origin);
  creatorUrl.pathname = `${basePath}/user`;
  creatorUrl.searchParams.append('id', result.by);
  result.creatorUrl = creatorUrl.href;

  if (result.url) {
    try {
      const externalUrl = new URL(result.url);
      result.itemHostname = externalUrl.hostname;
    } catch (_) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // result.url might not be valid, does not have to be handled
      // result.itemHostname will be undefined
    }
  }

  const itemUrl = new URL(window.location.origin);
  itemUrl.pathname = `${basePath}/item`;
  itemUrl.searchParams.append('id', result.id.toString());
  result.itemUrl = itemUrl.href;

  if (upstreamURL) {
    const itemUpstreamUrl = new URL(upstreamURL);
    itemUpstreamUrl.pathname = '/item';
    itemUpstreamUrl.searchParams.append('id', result.id.toString());
    result.itemUpstreamUrl = itemUpstreamUrl.href;
  }

  return result;
}

const hnApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL }),
  endpoints: (build) => ({
    getItem: build.query({
      query: (id) => ({ url: `/item/${id}.json` }),
      transformResponse: (response: RawHNItem) => augmentHNItem(response),
    }),
    getItems: build.query({
      queryFn: async (arg: number[], _queryApi, _extraOptions, fetchWithBQ) => {
        const proms: ReturnType<typeof fetchWithBQ>[] = [];

        for (let count = 0; count < arg.length; count += 1) {
          proms.push(fetchWithBQ(`item/${arg[count]}.json`));
        }

        try {
          const responses = await Promise.allSettled(proms);
          const result: HNItem[] = [];

          responses.forEach((response) => {
            if (response.status === 'fulfilled') {
              if (response.value.data) {
                result.push(augmentHNItem(response.value.data as RawHNItem));
              }
            }
          });

          return { data: result };
        } catch (err) {
          return { error: err as FetchBaseQueryError };
        }
      },
    }),
    getTopItems: build.query({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const { limit, page } = arg;
        const topItemsResponse = await fetchWithBQ('/topstories.json');

        if (topItemsResponse.error) {
          return { error: topItemsResponse.error as FetchBaseQueryError };
        }

        const itemIds = topItemsResponse.data as number[];
        const proms: ReturnType<typeof fetchWithBQ>[] = [];

        for (let count = 0, idx = ((page - 1) * limit); count < limit; count += 1, idx += 1) {
          proms.push(fetchWithBQ(`/item/${itemIds[idx]}.json`));
        }

        try {
          const responses = await Promise.allSettled(proms);
          const result: HNItem[] = [];

          responses.forEach((response) => {
            if (response.status === 'fulfilled') {
              if (response.value.data) {
                result.push(augmentHNItem(response.value.data as RawHNItem));
              }
            }
          });

          return { data: result };
        } catch (err) {
          return { error: err as FetchBaseQueryError };
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
