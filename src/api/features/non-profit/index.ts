import { api } from "../..";
import { NonProfit } from "./types";

export const NonProfitApi = api.injectEndpoints({
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
  })
})

export const { useGetNonProfitsQuery, useAddNonProfitMutation, useUpdateNonProfitMutation } = NonProfitApi;