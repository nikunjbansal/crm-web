export type Grants = {
  id: number;
  nonprofitLegalName: string;
  grantSubmissionName: string;
  stage: string;
  foundationOwner: string;
  requestedAmount: number;
  awardedAmount?: number;
  grantType: string;
  tags?: string[];
  durationStart: Date;
  durationEnd: Date;
  additionalFileFolderPath?: string;
  grantSubmissionId: number;
}

export const GrantsFields = [
  {label: 'Nonprofit Legal Name', key: 'nonprofitLegalName' as const},
  {label: 'Grant Submission Name', key: 'grantSubmissionName' as const},
  {label: 'Stage', key: 'stage' as const},
  {label: 'Foundation Owner', key: 'foundationOwner' as const},
  {label: 'Requested Amount', key: 'requestedAmount' as const},
  {label: 'Awarded Amount', key: 'awardedAmount' as const},
  {label: 'Grant Type', key: 'grantType' as const},
  {label: 'Tags', key: 'tags' as const},
  {label: 'Duration Start', key: 'durationStart' as const},
  {label: 'Duration End', key: 'durationEnd' as const},
  {label: 'Additional File Folder Path', key: 'additionalFileFolderPath' as const},
  {label: 'Grant Submission Id', key: 'grantSubmissionId' as const}
];