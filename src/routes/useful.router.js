const router = require('express').Router()

const usefulController = require('../controllers/useful.controller')
router.get('/matche', (req, res) => {
  res.status(200).json('Tesst')
})
router.get('/matche/:leagueID/:team/:domain', usefulController.homeAway)
router.get('/matche/:leagueID/:team', usefulController.all)
router.get('/team/:leagueID', usefulController.team)

module.exports = router