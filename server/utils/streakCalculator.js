// calculates current streak and longest streak from an array
// dates=array of date objects when habbit is completed
const calculateStreaks = (dates) => {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }
  const dateStrings = dates
    .map((d) => new Date(d).toISOString().split("T")[0])
    .sort();

  // remove duplicates
  const uniqueDates = [...new Set(dateStrings)];

  //   calculate longest Streak
  let longestStreak = 1;
  let tempStreak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);

    // check if dates are consecutive(difference = 1day)
    const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  //   calculate current Streak
  let currentStreak = 0;
  const today = new Date().toISOString.split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split(T)[0];

  // streak is active if completed today or yesterday
  const lastDate = uniqueDates[uniqueDates.length - 1];
  if (lastDate !== today && lastDate !== yesterday) {
    return { currentStreak: 0, longestStreak };
  }

  let checkDate = new Date(lastDate);
  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    const dateToCheck = checkDate.toISOString().split("T")[0];

    if (uniqueDate[i] === dateToCheck) {
      currentStreak++;
      checkDate = new Date(checkDate - 86400000);
    } else {
      break;
    }
  }
  return { currentStreak, longestStreak };
};

// get todays date at midnight (for consistent data comparisons)
const getTodayDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Get start and end of a given month
const getMonthRange = (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return { start, end };
};
module.exports = { calculateStreaks, getTodayDate, getMonthRange };
