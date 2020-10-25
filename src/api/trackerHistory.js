export const getAll = () => ({
  url: '/tracker-history',
  method: 'get',
});

export const getTrackerHistoryToday = () => ({
  url: '/tracker-history/today',
  method: 'get',
});
