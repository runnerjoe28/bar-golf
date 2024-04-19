const express = require('express')
const { 
  getDrinks,
  getDrink,
  createDrink,
  updateDrink,
  deleteDrink
} = require('../controllers/drinkController')

const router = express.Router()

// GET all user
router.get('/', getDrinks)

// GET a single user
router.get('/:name', getDrink)

// POST a new user
router.post('/', createDrink)

// UPDATE a user
router.patch('/:name', updateDrink)

// Delete a user
router.delete('/:name', deleteDrink)

module.exports = router