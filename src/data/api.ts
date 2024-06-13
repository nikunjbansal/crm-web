import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { NonProfit } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3004',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['NonProfit', 'EmailTemplate', 'EmailSent'],
  endpoints: (builder) => ({
    getNonProfits: builder.query<NonProfit[], void>({
      query: () => `non-profits`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'NonProfit', id }) as const),
        { type: 'NonProfit' as const, id: 'LIST' },
      ],
    }),
    addNonProfit: builder.mutation<NonProfit, Partial<NonProfit>>({
      query: (body) => ({
        url: 'non-profits',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'NonProfit', id: 'LIST'}]
    }),
    updateNonProfit: builder.mutation<void, { id: number; nonProfit: Partial<NonProfit> }>({
      query: ({ id, nonProfit }) => ({
        url: `non-profits/${id}`,
        method: 'PUT',
        body: nonProfit,
      }),
    }),
  }),
})

export const { useGetNonProfitsQuery, useAddNonProfitMutation, useUpdateNonProfitMutation } = api;
