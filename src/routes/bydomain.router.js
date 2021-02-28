const router = require('express').Router()

const byDomainController = require('../controllers/bydomain.controller')

router.get('/info/:leagueID/:domain', byDomainController.full)
router.get('/corner/:leagueID/:domain', byDomainController.cornerFull)
router.get('/corner/:leagueID/:domain/:team/:matche', byDomainController.cornerPart)


module.exports = router