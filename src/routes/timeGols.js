const router = require('express').Router()
const port = 3000

const controller = require('../controllers/timeGols')

router.get('/', controller.get)

module.exports = router