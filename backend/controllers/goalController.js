const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel.js')
const { default: mongoose } = require('mongoose')

const User = require('../models/userModel.js')


const getGoals =  asyncHandler(async(req,res) => {
    const goals = await Goal.find({ user: req.user.id})

    res.status(200).json(goals)
})


const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400 )
        throw new Error ('Please add text feild')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})


const updateGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)
     if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    //Check for User
     
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
      }
    // Make sure login user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)
})


const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
     //Check for User
     if (!req.user) {
         res.status(401)
         throw new Error('User not found')
       }
     // Make sure login user matches the goal user
     if (goal.user.toString() !== req.user.id) {
         res.status(401)
         throw new Error('User not authorized')
     }
    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}