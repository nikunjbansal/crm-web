export type EmailTemplate = {
  id: number,
  subject: string,
  body: string
}

export const emailTemplateFields = [
  { key: 'subject' as const, label: 'Subject' },
  { key: 'body' as const, label: 'Body' },
]

export type SentEmails = {
  body: string,
  subject: string,
  sentAt: Date,
  email: string,
  name: string,
}

export const sentEmailFields = [
  { key: 'subject' as const, label: 'Subject' },
  { key: 'body' as const, label: 'Body' },
  { key: 'sentAt' as const, label: 'SentAt' },
  { key: 'email' as const, label: 'NonProfit Email' },
  { key: 'name' as const, label: 'NonProfit Name' },
]