export const getFullYearsWorked = (joinedAt: Date): number => {
  const today = new Date();

  const yearsDiff = today.getFullYear() - joinedAt.getFullYear();
  console.log(joinedAt);

  if (yearsDiff <= 0) {
    return 0;
  }

  const monthDiff = today.getMonth() - joinedAt.getMonth();
  const dayDiff = today.getDate() - joinedAt.getDate();

  if (monthDiff < 0) {
    return yearsDiff - 1;
  }

  if (monthDiff === 0 && dayDiff < 0) {
    return yearsDiff - 1;
  }
  return 1;
};
