const router = require('express').Router()

const goalController = require('../controllers/goal-controller')

router.get('/', goalController.teamAll)
router.get('/:id', goalController.teamid)

module.exports = router