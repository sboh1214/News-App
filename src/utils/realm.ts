export const SearchHistorySchema = {
  name: 'Search History',
  properties: {
    query: 'string',
    date: 'date',
  },
};

export type SearchHistory = {
  query: string;
  date: Date;
};
