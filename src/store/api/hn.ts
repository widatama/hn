import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { HNItem } from '@/types/hn';

const hnApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
  endpoints: (builder) => ({
    getTopItems: builder.query({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const { limit } = arg;
        const topItemsResponse = await fetchWithBQ('/topstories.json');

        if (topItemsResponse.error) {
          return { error: topItemsResponse.error as fetchBaseQueryError };
        }

        const itemIds = topItemsResponse.data as number[];
        const proms: Promise = [];

        for (let count = 0; count < limit; count += 1) {
          proms.push(fetchWithBQ(`/item/${itemIds[count]}.json`));
        }

        try {
          const responses = await Promise.allSettled(proms);
          const result: HNItem[] = [];

          responses.forEach((response) => {
            result.push(response.value.data as HNItem);
          });

          return { data: result };
        } catch (err) {
          return { error: err as fetchBaseQueryError };
        }
      },
    }),
  }),
  reducerPath: 'hnApi',
});

export default hnApi;

export const { useGetTopItemsQuery } = hnApi;
