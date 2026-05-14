const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Habit name is required"],
      trim: true,
      maxlength: [100, "Habit name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 300 characters "],
      default: "",
    },
    category: {
      type: String,
      enum: [
        "Health",
        "Fitness",
        "Learning",
        "Mindfulness",
        "Nutrition",
        "Sleep",
        "Social",
        "Finance",
        "Other",
      ],
      default: "Health",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },
    //   for weekly habits - which days of the week (0=sun 1=mon ...)
    weekdays: {
      type: [Number],
      default: [],
    },
    goalPerMonth: {
      type: Number,
      default: 30,
      min: [1, "Goal must be at least 1"],
      max: [31, "Goal cannot exceed 31"],
    },
    color: {
      type: String,
      default: "#10b981",
    },
    icon: {
      type: String,
      default: "⭐",
    },
    reminderTime: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true, //soft delete
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Habit", HabitSchema);
