const express = require('express')
const { 
  getDrinks,
  getDrink,
  createDrink,
  updateDrink
} = require('../controllers/drinkController')

const router = express.Router()

// GET all workouts
router.get('/', getDrinks)

// GET a single workout
router.get('/:name', getDrink)

// POST a new workout
router.post('/', createDrink)

// UPDATE a workout
router.patch('/:name', updateDrink)

module.exports = router