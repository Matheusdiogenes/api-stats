const router = require('express').Router()

const generalController = require('../controllers/general.controller')

router.get('/info/:leagueID', generalController.team)
router.get('/goal/:leagueID', generalController.goal)
router.get('/goal/:leagueID/:team/:matche', generalController.goalTeam)

module.exports = router