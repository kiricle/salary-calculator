export const getFullYearsWorked = (joinedAt: Date): number => {
  const today = new Date();

  const yearsDiff = today.getFullYear() - joinedAt.getFullYear();

  if (yearsDiff <= 0) {
    return 0;
  }

  const monthDiff = today.getUTCMonth() - joinedAt.getUTCMonth();
  const dayDiff = today.getUTCDate() - joinedAt.getUTCDate();

  if (monthDiff < 0) {
    return yearsDiff - 1;
  }

  if (monthDiff === 0 && dayDiff < 0) {
    return yearsDiff - 1;
  }
  return yearsDiff;
};
