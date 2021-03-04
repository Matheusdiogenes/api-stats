const router = require('express').Router()

const byDomainController = require('../controllers/bydomain.controller')

router.get('/info/:leagueID/:domain', byDomainController.full)

module.exports = router