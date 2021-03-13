const router = require('express').Router()

const cornerController = require('../controllers/corner.controller')

router.get('/corner/:leagueID', cornerController.corner)
router.get('/corner/halftime/:leagueID', cornerController.corner1st)
router.get('/corner/halftime/:leagueID/:domain', cornerController.perDomain1st)
router.get('/corner/:leagueID/:team/:matche', cornerController.cornerTeam)
router.get('/corner/:leagueID/:domain', cornerController.perDomain)
router.get('/corner/:leagueID/:domain/:team/:matche', cornerController.perDomainTeam)

module.exports = router