export type NonProfit = {
  id: number,
  name: string,
  address: string,
  email: string,
}

export const nonProfitFields = [
  { key: 'name' as keyof NonProfit, label: 'Name' },
  { key: 'address' as keyof NonProfit, label: 'Address' },
  { key: 'email' as keyof NonProfit, label: 'Email' },
];