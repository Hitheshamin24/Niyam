// Helper: formats a date into YYYY-MM-DD using UTC date components
const toDateKey = (dateInput) => {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Calculates current streak and longest streak from an array of date records
const calculateStreaks = (dates) => {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateStrings = dates
    .map((d) => toDateKey(d))
    .filter(Boolean)
    .sort();

  // remove duplicates
  const uniqueDates = [...new Set(dateStrings)];
  if (uniqueDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Calculate longest streak
  let longestStreak = 1;
  let tempStreak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(`${uniqueDates[i - 1]}T00:00:00.000Z`);
    const curr = new Date(`${uniqueDates[i]}T00:00:00.000Z`);

    // Check if dates are consecutive (1 day apart)
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // Calculate current streak based on local calendar today & yesterday
  const now = new Date();
  const localYear = now.getFullYear();
  const localMonth = String(now.getMonth() + 1).padStart(2, "0");
  const localDay = String(now.getDate()).padStart(2, "0");
  const today = `${localYear}-${localMonth}-${localDay}`;

  const yDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const yYear = yDate.getFullYear();
  const yMonth = String(yDate.getMonth() + 1).padStart(2, "0");
  const yDay = String(yDate.getDate()).padStart(2, "0");
  const yesterday = `${yYear}-${yMonth}-${yDay}`;

  // Streak is active if completed today or yesterday
  const lastDate = uniqueDates[uniqueDates.length - 1];
  if (lastDate !== today && lastDate !== yesterday) {
    return { currentStreak: 0, longestStreak };
  }

  let currentStreak = 0;
  let checkDate = new Date(`${lastDate}T00:00:00.000Z`);
  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    const dateToCheck = toDateKey(checkDate);

    if (uniqueDates[i] === dateToCheck) {
      currentStreak++;
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
};

// Get today's calendar date at UTC midnight for consistent database storage and query matching
const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
};

// Get start and end of a given month in UTC
const getMonthRange = (year, month) => {
  const startMonth = String(month).padStart(2, "0");
  const start = new Date(`${year}-${startMonth}-01T00:00:00.000Z`);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const end = new Date(`${year}-${startMonth}-${String(lastDay).padStart(2, "0")}T23:59:59.999Z`);
  return { start, end };
};

module.exports = { calculateStreaks, getTodayDate, getMonthRange, toDateKey };
