export const selectFilter = (filterId, pattern) => {
  return {
    type: 'SELECT_FILTER',
    payload: {
      filterId: filterId,
      pattern: pattern
    }
  }
};