const router = require('express').Router()
const port = 3000

const controller = require('../controllers/teamGoal')

router.get('/', controller.get)
router.get('/:team', controller.getTeam)

module.exports = router