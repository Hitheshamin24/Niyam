const mongoose = require("mongoose");
const HabitLogSchema = new mongoose.Schema(
  {
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    //   store date part
    // format YYYY-MM-DD
    completedDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      default: "",
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
  },
  { timestamps: true },
);
HabitLogSchema.index({ habitId: 1, completedDate: 1 }, { unique: true });
module.exports = mongoose.model("HabitLog", HabitLogSchema);
