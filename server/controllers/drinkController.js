const Drink = require('../models/drinkModel')

// get all drinks
const getDrinks = async(req, res) => {
  const drinks = await Drink.find({})
  res.status(200).json(drinks)
}


// get a single drink
const getDrink = async(req, res) => {
  const {name} = req.params

  const drink = await Drink.findOne({name: name})

  if (!drink) {
    return res.status(404).json({error: 'No such drink'})
  }

  res.status(200).json(drink)
}

// create new drink
const createDrink = async(req, res) => {
  const {name, teamname, bar0, bar1, bar2, bar3, bar4, bar5} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!teamname) {
    emptyFields.push('teamname')
  }
  if (!bar0) {
    emptyFields.push("bar0")
  }
  if (!bar1) {
    emptyFields.push("bar1")
  }
  if (!bar2) {
    emptyFields.push("bar2")
  }
  if (!bar3) {
    emptyFields.push("bar3")
  }
  if (!bar4) {
    emptyFields.push("bar4")
  }
  if (!bar5) {
    emptyFields.push("bar5")
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
  }

  // add doc to db
  try {
    const drink = await Drink.create({name, teamname, bar0, bar1, bar2, bar3, bar4, bar5})
    res.status(200).json(drink)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update a drink
const updateDrink = async(req, res) => {
  const { name } = req.params

  const drink = await Drink.findOneAndUpdate({name: name}, {
    ...req.body
  })

  if (!drink) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(drink)
}

// delete a drink
const deleteDrink = async(req, res) => {
  const { name } = req.params

  const drink = await Drink.deleteOne({name: name})

  if (!drink) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(drink)
}


module.exports = {
  getDrinks,
  getDrink,
  createDrink,
  updateDrink,
  deleteDrink
}