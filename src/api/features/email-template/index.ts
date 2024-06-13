import { api } from "../..";
import { EmailTemplate, SentEmails } from "./types";

export const EmailTemplateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query<EmailTemplate[], void>({
      query: () => `email-templates`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'EmailTemplate', id }) as const),
        { type: 'EmailTemplate' as const, id: 'LIST' },
      ],
    }),
    addEmailTemplate: builder.mutation<EmailTemplate, Partial<EmailTemplate>>({
      query: (body) => ({
        url: 'email-templates',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'EmailTemplate', id: 'LIST'}]
    }),
    updateEmailTemplate: builder.mutation<void, { id: number; emailTemplate: Partial<EmailTemplate> }>({
      query: ({ id, emailTemplate }) => ({
        url: `email-templates/${id}`,
        method: 'PUT',
        body: emailTemplate,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'EmailTemplate', id: arg.id }],
    }),
    sendEmail: builder.mutation<void, { templateId: number }>({
      query: ({ templateId }) => ({
        url: `email-templates/${templateId}/send`,
        method: 'POST',
      }),
      invalidatesTags: ['SentEmails']
    }),
    getSentEmails: builder.query<SentEmails[], void>({
      query: () => `email-templates/sent-emails`,
      transformResponse: (response: any[]) => {
        return response.map((sentEmail) => ({
          body: sentEmail.body,
          subject: sentEmail.subject,
          sentAt: sentEmail.sentAt,
          email: sentEmail.nonProfit.email,
          name: sentEmail.nonProfit.name,
        }));
      },
      providesTags: (result = []) => [
        ...result.map(({ sentAt }) => ({ type: 'SentEmails', id: String(sentAt) }) as const),
        { type: 'SentEmails' as const, id: 'LIST' },
      ],
    }),
  })
})

export const { useGetEmailTemplatesQuery, useAddEmailTemplateMutation, useUpdateEmailTemplateMutation, useSendEmailMutation, useGetSentEmailsQuery } = EmailTemplateApi;