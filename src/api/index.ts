import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3004',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['NonProfit', 'EmailTemplate', 'SentEmails', 'Grants'],
  endpoints: (builder) => ({
    // individual features will inject their own endpoints.
  }),
})