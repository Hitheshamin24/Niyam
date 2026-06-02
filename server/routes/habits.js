const express = require('express');
const { body } = require('express-validator');
const {
  createHabit,
  getHabits,
  getHabit,
  updateHabit,
  deleteHabit,
  logHabit,
  unLogHabit,
  getTodayHabits,
  getHabitStats,
} = require('../controllers/habitController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All habit routes are protected — must send token
router.use(protect);

// ─── Validation rules for creating/updating a habit ──────────────────────────
const habitValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Habit name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('category')
    .optional()
    .isIn(['Health', 'Fitness', 'Learning', 'Mindfulness', 'Nutrition', 'Sleep', 'Social', 'Finance', 'Other'])
    .withMessage('Invalid category'),

  body('frequency')
    .optional()
    .isIn(['daily', 'weekly'])
    .withMessage('Frequency must be daily or weekly'),

  body('goalPerMonth')
    .optional()
    .isInt({ min: 1, max: 31 })
    .withMessage('Goal must be between 1 and 31'),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// IMPORTANT: /today must come BEFORE /:id
// Otherwise Express thinks "today" is an :id parameter
router.get('/today', getTodayHabits);             // GET  /api/habits/today

router.route('/')
  .get(getHabits)                                 // GET  /api/habits
  .post(habitValidation, createHabit);            // POST /api/habits

router.route('/:id')
  .get(getHabit)                                  // GET    /api/habits/:id
  .put(updateHabit)                               // PUT    /api/habits/:id
  .delete(deleteHabit);                           // DELETE /api/habits/:id

router.get('/:id/stats', getHabitStats);          // GET    /api/habits/:id/stats
router.post('/:id/log',  logHabit);               // POST   /api/habits/:id/log
router.delete('/:id/log', unLogHabit);            // DELETE /api/habits/:id/log

module.exports = router;