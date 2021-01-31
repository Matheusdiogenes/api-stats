const router = require('express').Router()

const goalController = require('../controllers/goal-controller')

router.get('/teamon', goalController.teamOn)
router.get('/info', goalController.info)
// router.get('/info/fulltime', controller)
// router.get('/info/fulltime/:team/:latest', controller)
// router.get('/info/halftime', controller)
// router.get('/info/halftime/:team/:latest', controller)
// router.get('/info/overunder/', controller)
// router.get('/info/overunder/:team/:latest', controller)
// router.get('/info/btts/', controller)
// router.get('/info/btts/:team/:latest', controller)

module.exports = router