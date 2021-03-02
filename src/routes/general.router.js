const router = require('express').Router()

const generalController = require('../controllers/general.controller')

router.get('/info/:leagueID', generalController.team)
router.get('/goal/:leagueID', generalController.goal)
router.get('/goal/:leagueID/:team/:matche', generalController.goalTeam)
router.get('/corner/:leagueID', generalController.corner)
router.get('/corner/:leagueID/:team/:matche', generalController.cornerTeam)


module.exports = router