import { api } from "../..";
import { Grants } from "./types";

export const GrantsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGrants: builder.query<Grants[], void>({
      query: () => `grants`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Grants', id }) as const),
        { type: 'Grants' as const, id: 'LIST' },
      ],
    }),
    uploadGrantsCsv: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `grants/upload`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Grants', id: 'LIST' }],
    }),
  })
})

export const { useGetGrantsQuery, useUploadGrantsCsvMutation } = GrantsApi;