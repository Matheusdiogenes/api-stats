const router = require('express').Router()

const goalHalfFull = require('../controllers/goal/halfFull')
const goalOverUnder = require('../controllers/goal/overUnder')
const goalBtts = require('../controllers/goal/bothTeamsToScore')


router.get('/fulltime', goalHalfFull.fullTime)
router.get('/fulltime/:team/:latest', goalHalfFull.latestFT)
router.get('/halftime', goalHalfFull.halftime)
router.get('/halftime/:team/:latest', goalHalfFull.latestHT)
router.get('/overunder/ft', goalOverUnder.OverUnderFT)
router.get('/overunder/ft/:team/:latest', goalOverUnder.latestOverUnderFT)
router.get('/overunder/ht', goalOverUnder.OverUnderHT)
router.get('/overunder/ht/:team/:latest', goalOverUnder.latestOverUnderHT)
router.get('/btts', goalBtts.btts)
router.get('/btts/:team/:latest', goalBtts.latestBtts)

module.exports = router