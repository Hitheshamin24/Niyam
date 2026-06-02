const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const { validationResult } = require("express-validator");
const {
  calculateStreaks,
  getTodayDate,
  getMonthRange,
} = require("../utils/streakCalculator");

// create habit
// Route:POST/api/habits
// Access:Private
const createHabit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }
  try {
    const habit = await Habit.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({ success: true, message: "Habit created!", habit });
  } catch (error) {
    console.error("Create habit error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error creating habit" });
  }
};
// Get all habits
// Route:GET/api/habits
// Access:Private
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      userId: req.user._id,
      isActive: true,
    }).lean().sort({ createdAt: -1 }); //newest first
    res.status(200).json({ success: true, count: habits.length, habits });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error fetching habits" });
  }
};

// get single habit
// Route:GET/api/habits/:id
// Access:Private
const getHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    res.status(200).json({ success: true, habit });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error fetching" });
  }
};

// update habit
// Route :PUT/api/habits/:id
// Access:Private
const updateHabit = async (req, res) => {
  try {
    let habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    delete req.body.userId;
    delete req.body.createdAt;
    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Return the updated document
    );
    res.status(200).json({ success: true, message: "Habit updated!", habit });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error updating habits" });
  }
};

// Delete habit
// Route :DELETE/api/habits/:id
// Access:Private
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    // instead of removing from db just inactive
    await Habit.findByIdAndUpdate(req.params.id, { isActive: false });

    await HabitLog.deleteMany({ habitId: req.params.id });
    res.status(200).json({ success: true, message: "Habit deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error deleting habit" });
  }
};

// log habit
// mark habit complete
// Route: POST /api/habits/:id/log
// Access : Private
const logHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    const today = getTodayDate();
    // check if already logged today
    const existingLog = await HabitLog.findOne({
      habitId: req.params.id,
      userId: req.user._id,
      completedDate: today,
    });
    if (existingLog) {
      return res.status(400).json({
        success: false,
        message: "Habit already marked complete for today",
      });
    }

    const log = await HabitLog.create({
      habitId: req.params.id,
      userId: req.user._id,
      completedDate: today,
      note: req.body.note || "",
    });
    res
      .status(201)
      .json({ success: true, message: "Habit marked complete", log });
  } catch (error) {
    console.error("Log habit error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error logging habit" });
  }
};

// unmark habit remove todays log
// Route:  DELETE /api/habits/:id/log
// Access: Private
const unLogHabit = async (req, res) => {
  try {
    const today = getTodayDate();
    const log = await HabitLog.findOneAndDelete({
      habitId: req.params.id,
      userId: req.user._id,
      completedDate: today,
    });
    if (!log) {
      return res.status(404).json({
        success: false,
        message: "No log found for today",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Habit unmarked for today" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error unlogging habit" });
  }
};

// Get todays habit completion status
// Route:  GET /api/habits/today
// Access: Private
const getTodayHabits = async (req, res) => {
  try {
    const today = getTodayDate();
    const dayOfWeek = new Date().getDay();
    const habits = await Habit.find({ userId: req.user._id, isActive: true });

    // filter habits that should appear today based on frequency
    const todayHabits = habits.filter((habit) => {
      if (habit.frequency === "daily") return true;
      if (habit.frequency === "weekly") {
        return (
          habit.weekdays.length === 0 || habit.weekdays.includes(dayOfWeek)
        );
      }
      return true;
    });
    // get all logs for today for this user
    const todayLogs = await HabitLog.find({
      userId: req.user._id,
      completedDate: today,
    });
    // create set of completed habit ids for fast lookup
    const completedIds = new Set(
      todayLogs.map((log) => log.habitId.toString()),
    );
    // Attach completedToday flag to each habit
    const habitsWithStatus = todayHabits.map((habit) => ({
      ...habit.toObject(),
      completedToday: completedIds.has(habit._id.toString()),
    }));

    // summary counts
    const totalToday = habitsWithStatus.length;
    const completedToday = habitsWithStatus.filter(
      (h) => h.completedToday,
    ).length;
    const remaining = totalToday - completedToday;
    res.status(200).json({
      success: true,
      summary: { totalToday, completedToday, remaining },
      habits: habitsWithStatus,
    });
  } catch (error) {
    console.error("Get today habits error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching today habits" });
  }
};

// ─── GET HABIT STATS (STREAKS + PROGRESS) ────────────────────────────────────
// Route:  GET /api/habits/:id/stats
// Access: Private
const getHabitStats = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }

    // Get current month range
    const now = new Date();
    const { start, end } = getMonthRange(now.getFullYear(), now.getMonth() + 1);

    // Get all logs for this habit this month
    const monthLogs = await HabitLog.find({
      habitId: req.params.id,
      completedDate: { $gte: start, $lte: end },
    });

    // Get ALL logs ever for streak calculation
    const allLogs = await HabitLog.find({ habitId: req.params.id }).sort({
      completedDate: 1,
    });

    const { currentStreak, longestStreak } = calculateStreaks(
      allLogs.map((log) => log.completedDate),
    );

    const completedThisMonth = monthLogs.length;
    const progressPercent =
      habit.goalPerMonth > 0
        ? Math.round((completedThisMonth / habit.goalPerMonth) * 100)
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        currentStreak,
        longestStreak,
        completedThisMonth,
        goalPerMonth: habit.goalPerMonth,
        progressPercent: Math.min(progressPercent, 100), // Cap at 100%
        totalCompletions: allLogs.length,
      },
    });
  } catch (error) {
    console.error("Get habit stats error",error)
    res
      .status(500)
      .json({ success: false, message: "Server error fetching habit stats" });
  }
}; 

module.exports = {
  createHabit,
  getHabits,
  getHabit,
  updateHabit,
  deleteHabit,
  logHabit,
  unLogHabit,
  getTodayHabits,
  getHabitStats,
};
