const router = require('express').Router()

const byDomainController = require('../controllers/byDomain')

router.get('/info/:leagueID/:domain', byDomainController.infoDomain)
router.get('/defense/:leagueID/:domain', byDomainController.defenseDomain) 
router.get('/attack/:leagueID/:domain', byDomainController.attackDomain) 
router.get('/corner/:leagueID/:domain', byDomainController.cornerDomain)
router.get('/corner/:leagueID/:domain/:team/:matche', byDomainController.cornerDomainMatche)


module.exports = router