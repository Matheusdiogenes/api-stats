const router = require('express').Router()

const cornerController = require('../controllers/corner.controller')

router.get('/corner/:leagueID', cornerController.corner)
router.get('/corner/:leagueID/:team/:matche', cornerController.cornerTeam)
router.get('/corner/:leagueID/:domain', cornerController.perDomain)
router.get('/corner/:leagueID/:domain/:team/:matche', cornerController.perDomainTeam)

module.exports = router